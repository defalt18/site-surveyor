import React, { useMemo } from 'react';
import c from 'classnames';
import { reduce, map, isEmpty, groupBy, countBy, values, sumBy } from 'lodash';
import { ErrorDetailsType } from '../../types';
import { ErrorCircle } from '../../../../modules/utils/renderers';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	label: string;
	state?: ErrorDetailsType['type'];
	errors?: ErrorDetailsType['errors'];
	icon: React.ComponentType<React.SVGProps<any>>;
	showErrors?: boolean;
	containerClassName?: string;
}

const LABELS: Record<ButtonProps['state'], string | Array<string>> = {
	error: 'View Errors >',
	warning: 'View Warnings >',
	success: ['All set!', 'View All >'],
};

const COLORS: Record<string, Record<ButtonProps['state'], string>> = {
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
	const {
		label,
		state = 'success',
		icon,
		className,
		containerClassName,
		showErrors,
		errors = [],
		...rest
	} = props;
	const Icon = icon ?? undefined;
	const totalItemCount = useMemo(
		() => (isEmpty(errors) ? 0 : reduce(errors, (acc, item) => acc + item?.subErrorCount ?? 0, 0)),
		[errors]
	);

	const isNotJustTips = React.useMemo(
		() => Boolean(countBy(errors, 'errorType').success !== totalItemCount),
		[errors, totalItemCount]
	);

	const classifiedErrors = React.useMemo(
		() =>
			isEmpty(errors)
				? []
				: reduce(
						values(groupBy(errors, 'errorType')),
						(acc, item) => {
							const sumOfItems = sumBy(item, 'subErrorCount');
							return [...acc, { errorType: item[0].errorType, subErrorCount: sumOfItems }];
						},
						[]
				  ),
		[errors]
	);

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
				<p className='pl-[1.6rem] text-primary text-dark-primary flex-shrink-0'>{label}</p>
				<div className={showErrors ? 'flex flex-row items-center mr-6 gap-x-[0.4rem]' : 'mr-3'}>
					{!showErrors ? (
						<Icon />
					) : !isEmpty(errors) ? (
						map(classifiedErrors, ({ errorType, subErrorCount }, index) =>
							isNotJustTips && errorType === 'success' ? null : (
								<ErrorCircle
									key={index}
									type={errorType}
									totalErrorCount={subErrorCount}
									errorCountAdjustment={
										subErrorCount > 1000 ? '1000+' : subErrorCount > 500 ? '500+' : undefined
									}
									overrides={{
										label: 'text-small',
										container: 'flex-1',
										text: c({ 'px-2': subErrorCount > 500 }),
									}}
								/>
							)
						)
					) : (
						<ErrorCircle type='success' totalErrorCount={0} />
					)}
				</div>
			</div>
			{!!showErrors && (
				<button
					className={c(
						'h-[3.6rem] flex justify-center items-center w-full',
						COLORS.background[state],
						className
					)}
					{...rest}
					disabled={Boolean(rest.disabled || totalItemCount === 0)}
				>
					<p className='text-tertiary text-white'>
						{state === 'success' ? LABELS[state][Number(totalItemCount > 0)] : LABELS[state]}
					</p>
				</button>
			)}
		</div>
	);
};

export default React.memo(FeatureButton);
