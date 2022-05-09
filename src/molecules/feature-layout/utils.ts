import { AnalysisErrors } from './types';
import { filter, isEmpty, reduce, values } from 'lodash';

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
												`\n${literal.key} => Foreground: ${literal.foreground}, Background:${literal.background}\n`
											);
										return sentence + `\n${literal.key} : ${literal.value?.trim()}\n`;
									},
									''
								);
								return [
									...subErrorAcc,
									{
										'Checkpoint Name': checkpoint,
										'Error Type': errorType,
										Title: title,
										'Error Info': infoSentence,
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
		data,
		widths: [{ width: 20 }, { width: 20 }, { width: 60 }, { width: 170 }],
		filename: `${site_title} ${disability} errors.xlsx`,
	};
};
