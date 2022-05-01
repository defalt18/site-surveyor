import { AnalysisErrors, LayoutContainerProps } from '../../../../molecules/feature-layout/types';
import { ErrorRenderer } from '../../../utils/renderers';
import { AutoCompleteIcon, KeyboardIcon } from '../../../../assets/icons';
import { filter, isEmpty, reduce, size } from 'lodash';
import { getFocusErrors } from './utils';

export const ModuleSpecification: LayoutContainerProps = {
	title: 'Motor Disability',
	description:
		'13.7 percent of people with a disability have a mobility disability with serious difficulty walking or climbing stairs. 75 million people need a wheelchair on a daily basis. This represents 1% of the world’s populattion.',
	errorRenderer: ErrorRenderer,
	checkpoints: [
		{ name: 'Keyboard', icon: KeyboardIcon, tags: [{ name: 'WCAG', color: 'bg-muave-secondary' }] },
		{
			name: 'Auto-complete',
			icon: AutoCompleteIcon,
			tags: [{ name: 'WCAG', color: 'bg-muave-secondary' }],
		},
		{
			name: 'Bypass Blocks',
			icon: KeyboardIcon,
			tags: [{ name: 'WCAG', color: 'bg-muave-secondary' }],
		},
		{
			name: 'Page Title',
			icon: KeyboardIcon,
			tags: [{ name: 'WCAG', color: 'bg-muave-secondary' }],
		},
		{ name: 'Focus', icon: KeyboardIcon, tags: [{ name: 'WCAG', color: 'bg-muave-secondary' }] },
	],
	testingEnabled: true,
	checkUtility: async (dom) => {
		const allInputs = reduce(
			filter(dom.querySelectorAll('input'), (node) => isEmpty(node.autocomplete)),
			(res, item) => [
				...res,
				{
					records: [
						{ key: 'Input type', value: item.type },
						{ key: 'Auto-complete', value: 'absent' },
					],
				},
			],
			[]
		);
		const allButtons = dom.querySelectorAll('button');
		const allAnchors = dom.querySelectorAll('a');
		const allKeyAccessErrors = reduce(
			allButtons,
			(res, item) => {
				const isAccessible = item.onkeydown !== null || item.onkeyup !== null;
				if (!isAccessible)
					return [
						...res,
						{
							records: [
								{ key: 'Type', value: 'button' },
								{ key: 'Keyboard Accessibility tags', value: 'none' },
							],
						},
					];
				return res;
			},
			[]
		);
		const allAnchorErrors = reduce(
			filter(allAnchors, { href: '' }),
			(res) => [
				...res,
				{
					records: [
						{ key: 'Type', value: 'anchor' },
						{ key: 'Keyboard Accessibility Tag', value: 'none' },
					],
				},
			],
			[]
		);

		const allKeyboardErrors = reduce(
			[allAnchorErrors, allKeyAccessErrors],
			(res, item, index) => {
				if (!isEmpty(item))
					return [
						...res,
						{
							title:
								index === 0
									? 'Absence of href attribute in <a> tag'
									: 'Actions are not keyboard accessible',
							subErrors: item,
							subErrorCount: size(item),
							errorType: 'error',
							tags: index === 0 ? [{ name: 'Advised' }] : [{ name: '2.1.1' }, { name: 'Level A' }],
						},
					];
				return res;
			},
			[]
		);

		const allDivs = reduce(
			filter(
				dom.querySelectorAll('div'),
				(node) => isEmpty(node.ariaRoleDescription) && isEmpty(node.ariaLabel) && !isEmpty(node.id)
			),
			(res, item) => [
				...res,
				{
					records: [
						{ key: 'Container Identifier', value: item.id },
						{ key: 'ARIA Label', value: 'absent' },
					],
				},
			],
			[]
		);

		const focusErrors = getFocusErrors(dom);

		return {
			Keyboard: {
				name: 'Keyboard',
				count: 2,
				type: !isEmpty(allKeyboardErrors) ? 'error' : 'warning',
				errors: [
					{
						title: 'Ensure all functionalities are keyboard accessible',
						errorType: 'warning',
						subErrorCount: 1,
						subErrors: [{ records: [{ key: 'Source element', value: 'button' }] }],
						tips: [
							{
								description:
									'Use HTML form controls and links to ensure keyboard accessibility and  provide a mechanism to allow users to remap or turn off character key shortcuts if keyboard shortcut is implemented in content using only letter, punctuation, number, or symbol characters',
							},
							{
								description:
									'Ensure all event handlers triggered by non-keyboard UI events are also associated with a keyboard-based event, or provide redundant keyboard-based mechanisms to accomplish the functionality provided by other device-specific functions',
							},
						],
						tags: [{ name: '2.1.1' }, { name: 'Level A' }],
					},
					{
						title:
							'Ensure that that content does not "trap" keyboard focus within subsections of content on a Web page',
						errorType: 'success',
						subErrors: [
							{
								description:
									'<p>This problem can be avoided by using one of the following mechanisms:</p><ul><li>Ensuring that the keyboard function for advancing focus within content (commonly the tab key) exits the subset of the content after it reaches the final navigation location.</li><li>Providing a keyboard function to move the focus out of the subset of the content. Be sure to document the feature in an accessible manner within the subset. </li><li>If the technology used in the subset of the content natively provides a "move to parent" keyboard command, documenting that command before the user enters the plug-in so they know how to get out again.</li></ul>',
							},
						],
						subErrorCount: 1,
						tags: [{ name: '2.1.2' }, { name: 'Level A' }],
					},
					...allKeyboardErrors,
				],
			},
			Focus: { name: 'Focus', count: 0, type: 'success', errors: focusErrors },
			'Bypass Blocks': {
				name: 'Bypass Blocks',
				count: size(allDivs),
				type: isEmpty(allDivs) ? 'success' : 'error',
				errors: isEmpty(allDivs)
					? undefined
					: [
							{
								title:
									'Section does not have ARIA label (Through “role” or “aria-labelledby” attribute) or heading defining its purpose. ',
								subErrorCount: size(allDivs),
								subErrors: allDivs,
								errorType: 'error',
								tags: [{ name: '2.4.1' }, { name: 'Level A' }],
							},
					  ],
			},
			'Auto-complete': {
				name: 'Auto-complete',
				count: size(allInputs),
				type: isEmpty(allInputs) ? 'success' : 'error',
				errors: isEmpty(allInputs)
					? undefined
					: [
							{
								title: 'Absence of auto-complete attribute in <input> tag',
								subErrors: allInputs,
								subErrorCount: size(allInputs),
								errorType: 'error',
								tags: [{ name: '1.3.5' }, { name: 'Level AA' }],
							},
					  ],
			},
			'Page Title': {
				name: 'Page Title',
				type: isEmpty(dom.title) ? 'error' : 'success',
				count: isEmpty(dom.title) ? 1 : 0,
				errors: isEmpty(dom.title.trim())
					? [
							{
								title: 'Page does not have a proper title',
								subErrors: [{ records: [{ key: 'Page title', value: 'absent' }] }],
								subErrorCount: 1,
								errorType: 'error',
								tags: [{ name: '2.4.2' }, { name: 'Level A' }],
							},
					  ]
					: undefined,
			},
		} as AnalysisErrors;
	},
};
