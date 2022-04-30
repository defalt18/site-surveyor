import { AnalysisErrors, LayoutContainerProps } from '../../../../molecules/feature-layout/types';
import { ErrorRenderer } from '../../../utils/renderers';
import { FormIcon } from '../../../../assets/icons';
import { filter, isEmpty, reduce, size } from 'lodash';

export const ModuleSpecification: LayoutContainerProps = {
	title: 'Culture',
	description:
		'People have different names as self-expression based on their culture. We should celebrate cultures and acknowledge the differences through design.',
	errorRenderer: ErrorRenderer,
	checkpoints: [
		{ name: 'Form-field', icon: FormIcon, tags: [{ name: 'Advised', color: 'bg-purple-primary' }] },
	],
	testingEnabled: true,
	checkUtility: async (dom) => {
		const allInputs = filter(
			dom.querySelectorAll('input'),
			(node) =>
				node.type === 'text' &&
				(node.placeholder.includes('name') || node.placeholder.includes('Name'))
		);
		const limitedInputsErrors = reduce(
			filter(allInputs, (node) => node.maxLength > 0),
			(res, item) => [
				...res,
				{
					records: [
						{ key: 'Input Type', value: 'text' },
						{ key: 'Placeholder', value: item.placeholder },
					],
				},
			],
			[]
		);

		const nameWarnings = reduce(
			allInputs,
			(res, item) => [
				...res,
				{
					records: [
						{ key: 'Input Type', value: 'text' },
						{ key: 'Placeholder', value: item.placeholder },
					],
				},
			],
			[]
		);

		const allErrors = reduce(
			[limitedInputsErrors, nameWarnings],
			(res, item, index) => {
				if (!isEmpty(item))
					return [
						...res,
						{
							title:
								index === 0
									? 'Name field has restriction on number of characters'
									: 'Use “Full name” field instead of two “first” and “last” name fields',
							subErrors: item,
							subErrorCount: size(item),
							errorType: index === 0 ? 'error' : 'warning',
							tips:
								index === 0
									? [
											{
												description:
													'Some cultures have longer names. For example, “Andrianampoinimerinatompokoindrindra” which is widely used name in Madagascar. So make sure you have applied no restrictions on character limit in any kind of name fields.',
											},
									  ]
									: [
											{
												description:
													'- Many people have two family names, one from each parent. For example, “Gabriel Perez Marquez” from Latin America.\n' +
													'- In China, family name is written as first name. For example, “Dong Tianhua”\n' +
													'- In Malasiya and Afghanistan, you might not have a family name.\n' +
													'\n' +
													'Therefore, allow users to enter full name rather than first and last name. Additionaly, you can ask for their preffered names.',
											},
									  ],
						},
					];
				return res;
			},
			[]
		);
		return {
			'Form-field': {
				name: 'Form-field',
				count: 0,
				type: 'success',
				errors: [
					...allErrors,
					{
						title: 'put no restriction on special characters in name fields',
						subErrors: [
							{
								description:
									'Some cultures have special characters in-betweem their names. For example, “Min-li” which is widely used name in China. So make sure you have applied no restrictions on special characters in any kind of name fields.',
							},
						],
						subErrorCount: 1,
						errorType: 'success',
					},
				],
			},
		} as AnalysisErrors;
	},
};
