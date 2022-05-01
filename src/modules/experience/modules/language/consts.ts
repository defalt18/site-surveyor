import { AnalysisErrors, LayoutContainerProps } from '../../../../molecules/feature-layout/types';
import { ErrorRenderer } from '../../../utils/renderers';
import { TextSVGIcon, AbbreviationIcon, WordsIcon } from '../../../../assets/icons';
import { filter, isEmpty, reduce, size } from 'lodash';

export const ModuleSpecification: LayoutContainerProps = {
	title: 'Language',
	description:
		'According to Ethnologue, there are currently 7,117 languages spoken around the world.',
	errorRenderer: ErrorRenderer,
	checkpoints: [
		{ name: 'HTML lang', icon: TextSVGIcon, tags: [{ name: 'WCAG', color: 'bg-muave-secondary' }] },
		{
			name: 'Unusual words',
			icon: WordsIcon,
			tags: [{ name: 'WCAG', color: 'bg-muave-secondary' }],
		},
		{
			name: 'Abbrieviations',
			icon: AbbreviationIcon,
			tags: [{ name: 'WCAG', color: 'bg-muave-secondary' }],
		},
	],
	testingEnabled: true,
	checkUtility: async (dom, _, otherAttribs) => {
		console.log('document', dom);
		const nonEmptyTextNodes = filter(
			dom.querySelectorAll(
				'p, h1, h2, h3, h4, h5, h6, span, button, a, pre, abbr, code, em, strong, details, summary'
			),
			(node) => node.textContent.trim() !== ''
		);
		const getPollutedTextTagsLangA = reduce(
			nonEmptyTextNodes,
			(res, item) => [
				...res,
				{
					records: [
						{ key: 'Tag', value: `<${item.localName}>` },
						{ key: 'Lang attribute', value: 'pt-br' },
					],
				},
			],
			[]
		);

		const getPollutedTextTagsLangB = reduce(
			nonEmptyTextNodes,
			(res, item) => [
				...res,
				{
					records: [
						{ key: 'Tag', value: `<${item.localName}>` },
						{ key: 'Lang attribute', value: 'fr' },
					],
				},
			],
			[]
		);

		const allHTMLErrorsAndWarnings = reduce(
			[[], getPollutedTextTagsLangA, getPollutedTextTagsLangB],
			(res, item, index) => {
				if (index === 0) {
					if (isEmpty(otherAttribs?.lang)) {
						return [
							...res,
							{
								title: 'Language attributes are not used on the html element for each page',
								subErrors: [{ records: [{ key: 'lang attribute', value: 'absent' }] }],
								subErrorCount: 1,
								errorType: 'error',
								tags: [{ name: '3.1.1' }, { name: 'Level A' }],
							},
						];
					}
				}
				if (index === 1 || index === 2) {
					if (!isEmpty(item))
						return [
							...res,
							{
								title: `Ensure appropriate language token is used in the lang attribute (lang=${
									index === 1 ? 'pt-br' : 'fr'
								})`,
								subErrors: item,
								subErrorCount: size(item),
								errorType: 'warning',
								tags: [{ name: '3.1.2' }, { name: 'Level AA' }],
							},
						];
				}
				return res;
			},
			[]
		);
		return {
			'HTML lang': {
				name: 'HTML lang',
				type: 'success',
				count: 0,
				errors: [
					{
						title:
							'Ensure appropriate language code (lang=”fr”) used wherever the text is in other language',
						errorType: 'success',
						subErrors: [
							{
								description:
									'Example : A Web page produced in Germany and written in HTML includes content in both German and English, but most of the content is in German. The default human language is identified as German (de) by the lang attribute on the html element.',
							},
						],
						subErrorCount: 1,
						tags: [{ name: '3.1.2' }, { name: 'Level AA' }],
					},
					...allHTMLErrorsAndWarnings,
				],
			},
			Abbrieviations: {
				name: 'Abbrieviations',
				type: 'success',
				count: 1,
				errors: [
					{
						title: 'Tips regarding Abbrieviations',
						subErrors: [
							{
								description:
									'As abbrieviations might confuse screen readers in different ways, provide definitions for abbreviations by using the abbr element.\n' +
									'\n' +
									'Example : Some abbreviations do not look like normal words and cannot be pronounced according to the usual rules of the language. For example, the English word "room" is abbreviated as "rm," which does not\n' +
									'correspond to any English word or phoneme. The user has to know that "rm" is an abbreviation for\n' +
									'the word "room" in order to say it correctly',
							},
						],
						subErrorCount: 1,
						errorType: 'success',
					},
				],
			},
			'Unusual words': {
				name: 'Unusual words',
				type: 'success',
				count: 4,
				errors: [
					{
						title: 'Tips regarding Unusual Words',
						subErrors: [
							{
								description:
									'Link to definitions of difficult words, as well as the definition of a word or phrase used in an unusual or restricted way\n',
							},
							{
								description: 'Using the dfn element to identify the defining instance of a word\n',
							},
							{
								description: 'Providing a function to search an online dictionary or a glossary\n',
							},
							{
								description: '- Using description lists',
							},
						],
						subErrorCount: 4,
						errorType: 'success',
					},
				],
			},
		} as AnalysisErrors;
	},
};
