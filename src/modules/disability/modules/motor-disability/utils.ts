import { filter, isEmpty, reduce, size } from 'lodash';
import { ErrorDetailsType } from '../../../../molecules/feature-layout/types';

export const getFocusErrors: (dom: Document) => ErrorDetailsType['errors'] = (dom: Document) => {
	const allDivs = dom.querySelectorAll('div');
	const outlineNoneDivs = reduce(
		filter(allDivs, (node) => node.style.outline === 'none'),
		(res, item) => [
			...res,
			{
				records: [
					{ key: 'Component Id', value: isEmpty(item.id) ? '<No id>' : item.id },
					{ key: 'style', value: 'outline: none' },
				],
			},
		],
		[]
	);
	const tabIndexDivs = reduce(
		filter(allDivs, (node) => node.tabIndex > 1),
		(res, item) => [
			...res,
			{
				records: [
					{ key: 'Component Id', value: isEmpty(item.id) ? '<No id>' : item.id },
					{ key: 'tabindex value', value: item.tabIndex },
				],
			},
		],
		[]
	);

	return reduce(
		[outlineNoneDivs, tabIndexDivs],
		(res, item, index) => {
			if (!isEmpty(item)) {
				return [
					...res,
					{
						title:
							index === 0
								? 'outline:0 found;  focus obstructing attribute'
								: 'tabindex value is greater than 1',
						errorType: 'error',
						subErrors: item,
						tags: [{ name: index === 0 ? '2.4.7' : '2.4.3' }, { name: 'Level A' }],
						subErrorCount: size(item),
					},
				];
			}
			return res;
		},
		[]
	) as ErrorDetailsType['errors'];
};
