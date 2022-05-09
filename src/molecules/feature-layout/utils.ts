import { AnalysisErrors } from './types';
import { CommonPropTypes } from 'react-csv/components/CommonPropTypes';
import { filter, isEmpty, reduce, values } from 'lodash';

const headers = [
	{ label: 'Checkpoint Name', key: 'details.checkpoint' },
	{ label: 'Error Type', key: 'details.errorType' },
	{ label: 'Error Title', key: 'details.title' },
	{ label: 'Errors Info', key: 'details.info' },
];

export const getCSVProps = (errors: AnalysisErrors, disability: string, site_title: string) => {
	const data = reduce(
		values(errors),
		(acc, { name: checkpoint, errors }) => {
			const concernedElements = filter(errors, (node) => node.errorType !== 'success');
			if (!isEmpty(concernedElements)) {
				const csvModifiedErrors = reduce(
					errors,
					(csvAcc, { title, errorType, subErrors }) => {
						const errorInfo = reduce(
							subErrors,
							(subErrorAcc, subError) => {
								const infoSentence = reduce(
									subError.records as Array<Record<string, string>>,
									(sentence, literal) => {
										if (literal.key === 'Colors')
											return (
												sentence +
												`${literal.key} => Foreground: ${literal.foreground}, Background:${literal.background}\t`
											);
										return sentence + `${literal.key} : ${literal.value?.trim()}\t`;
									},
									''
								);
								return [
									...subErrorAcc,
									{
										details: {
											checkpoint,
											title,
											errorType,
											info: infoSentence,
										},
									},
								];
							},
							[]
						);
						return [...csvAcc, ...errorInfo];
					},
					[]
				);
				return [...acc, ...csvModifiedErrors];
			} else return acc;
		},
		[]
	);
	return {
		headers,
		data,
		filename: `${site_title} ${disability} errors.csv`,
		enclosingCharacter: '',
	} as CommonPropTypes;
};
