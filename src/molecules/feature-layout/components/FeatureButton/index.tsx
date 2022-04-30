import React, { useMemo } from 'react';
import c from 'classnames';
import { reduce, map, isEmpty, groupBy, keys, values, sumBy } from 'lodash';
import { ErrorDetailsType } from '../../types';
import { ErrorCircle } from '../../../../modules/utils/renderers';

type STATUS_TYPE = 'warning' | 'success' | 'error';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	label: string;
	errors?: ErrorDetailsType['errors'];
	icon: React.ComponentType<React.SVGProps<any>>;
	showErrors?: boolean;
	containerClassName?: string;
}

const LABELS: Record<STATUS_TYPE, Array<string>> = {
	error: ['View Errors >', 'View All >'],
	warning: ['View Warnings >'],
	success: ['All set!', 'View Tips >'],
};

const COLORS: Record<string, Record<STATUS_TYPE, string>> = {
	background: {
		error: 'bg-red-primary',
		warning: 'bg-yellow-primary',
		success: 'bg-green-primary',
	},
	text: {
		error: 'text-red-primary',
		warning: 'text-yellow-primary',
		success: 'text-green-primary',
	},
	border: {
		error: 'border-red-primary',
		warning: 'border-yellow-primary',
		success: 'border-green-primary',
	},
};

const FeatureButton = (props: ButtonProps) => {
	const { label, icon, className, containerClassName, showErrors, errors = [], ...rest } = props;
	const Icon = icon ?? undefined;
	const totalItemCount = useMemo(
		() => (isEmpty(errors) ? 0 : reduce(errors, (acc, item) => acc + item?.subErrorCount ?? 0, 0)),
		[errors]
	);

	const classifiedErrors = React.useMemo(
		() =>
			reduce(
				values(groupBy(errors, 'errorType')),
				(acc, item) => {
					const sumOfItems = sumBy(item, 'subErrorCount');
					return {
						...acc,
						[item[0].errorType]: sumOfItems,
					};
				},
				{} as Record<STATUS_TYPE, number>
			),
		[errors]
	);

	const isNotJustTips = classifiedErrors.warning > 0 || classifiedErrors.error > 0;

	if (isNotJustTips) delete classifiedErrors.success;

	const type =
		classifiedErrors.error > 0 ? 'error' : classifiedErrors.warning > 0 ? 'warning' : 'success';

	return (
		<div
			className={c(
				'rounded-lg overflow-hidden max-h-[11.6rem] border border-brown-primary',
				containerClassName
			)}
		>
			<div
				className={c(
					'flex flex-row items-center justify-between w-full bg-white gap-x-4',
					showErrors ? 'h-[8rem]' : 'h-[10.4rem]'
				)}
			>
				<p lang='en' className='pl-[1.6rem] text-primary text-dark-primary flex-shrink hyphens'>
					{label}
				</p>
				<div
					className={showErrors ? 'flex flex-row items-center mr-6 gap-x-[0.4rem] w-fit' : 'mr-3'}
				>
					{!showErrors ? (
						<Icon />
					) : !isEmpty(errors) ? (
						map(keys(classifiedErrors), (keyName: 'success' | 'error' | 'warning', index) => (
							<ErrorCircle
								key={index}
								type={keyName}
								totalErrorCount={classifiedErrors[keyName]}
								errorCountAdjustment={
									classifiedErrors[keyName] > 1000
										? '1000+'
										: classifiedErrors[keyName] > 500
										? '500+'
										: undefined
								}
								overrides={{
									label: 'text-small w-min',
									container: 'flex-1',
									text: c({ 'px-2': classifiedErrors[keyName] > 500 }),
								}}
							/>
						))
					) : (
						<ErrorCircle
							type='success'
							totalErrorCount={0}
							overrides={{
								label: 'text-small w-min',
								container: 'flex-1',
							}}
						/>
					)}
				</div>
			</div>
			{!!showErrors && (
				<button
					className={c(
						'h-[3.6rem] flex justify-center items-center w-full',
						COLORS.background[type],
						className
					)}
					{...rest}
					disabled={Boolean(rest.disabled || totalItemCount === 0)}
				>
					<p className='text-tertiary text-white'>
						{type === 'error'
							? LABELS[type][Number(classifiedErrors.warning > 0)]
							: type === 'success'
							? LABELS[type][Number(classifiedErrors.success > 0)]
							: LABELS[type][0]}
					</p>
				</button>
			)}
		</div>
	);
};

export default React.memo(FeatureButton);
