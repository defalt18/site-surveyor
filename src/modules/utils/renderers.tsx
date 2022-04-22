import React from 'react';
import c from 'classnames';
import { map } from 'lodash';
import { ErrorAccordionProps } from '../../molecules/feature-layout/types';
import ArrowDrop from '../../assets/icons/ArrowDrop';

const COLORS: Record<string, Record<'error' | 'warning' | 'success', string>> = {
	background: {
		error: 'bg-red-primary',
		warning: 'bg-yellow-primary',
		success: '',
	},
	text: {
		error: 'text-red-primary',
		warning: 'text-yellow-primary',
		success: '',
	},
	border: {
		error: 'border-red-primary',
		warning: 'border-yellow-primary',
		success: '',
	},
};

const renderValue = (className: string, value: string, meta: boolean | undefined) =>
	meta ? (
		<a className={c('no-underline hover:underline', className, 'text-blue-400')} href={value}>
			{value}
		</a>
	) : (
		<p className={c('text-dark-primary', className)}>{value}</p>
	);

export const ErrorRenderer = (error: any) => {
	const { records } = error;
	return (
		<div className='flex flex-col gap-y-3 bg-white border border-t-0 border-brown-primary px-[1.9rem] py-[0.9rem] last:rounded-b-lg'>
			{map(records, ({ key, value, meta }) => {
				return (
					<div className='flex flex-row gap-x-2'>
						<p className='text-tertiary text-gray-primary flex-shrink-0 w-3/12'>{key}</p>
						{renderValue('text-tertiary flex-shrink overflow-ellipsis line-clamp-3', value, meta)}
					</div>
				);
			})}
		</div>
	);
};

export const DefaultErrorAccordion = ({
	title,
	type,
	errorCount,
	subErrors,
	ErrorRenderer,
}: ErrorAccordionProps) => {
	const [showErrors, toggle] = React.useState<boolean>(false);
	const [itemCount, setCount] = React.useState<number>(Math.min(10, errorCount));

	const showMore = () => setCount((count) => Math.min(count + 10, errorCount));
	return (
		<div className='rounded-lg'>
			<div
				className={c(
					'px-[1.8rem] py-4 flex flex-row text-white text-primary justify-between items-center rounded-lg',
					COLORS.background[type],
					{ 'rounded-b-none': showErrors }
				)}
			>
				<p className='text-white text-secondary truncate overflow-ellipsis'>{title}</p>
				<div className='flex flex-row items-center'>
					<ErrorCircle
						type={type}
						totalErrorCount={errorCount}
						showLabel={false}
						overrides={{ text: 'text-white', border: 'border-white' }}
					/>
					<button
						onClick={() => toggle(!showErrors)}
						className={c('w-[2.8rem] h-[2.8rem] ml-4', {
							'rotate-180': showErrors,
						})}
					>
						<ArrowDrop />
					</button>
				</div>
			</div>
			{!!showErrors && ErrorRenderer && (
				<>
					{map(subErrors.slice(0, itemCount), ErrorRenderer)}{' '}
					{itemCount < errorCount && (
						<div
							className='bg-brown-primary cursor-pointer border border-brown-primary border-t-0 rounded-b-lg text-tertiary text-white text-center px-[1.9rem] py-[0.9rem]'
							onClick={showMore}
						>
							Show {errorCount - itemCount} more {'>'}
						</div>
					)}
				</>
			)}
		</div>
	);
};

export const ErrorCircle = ({
	type,
	totalErrorCount,
	showLabel = true,
	overrides,
}: {
	type: 'error' | 'warning' | 'success';
	totalErrorCount: number;
	showLabel?: boolean;
	overrides?: { text: string; border: string };
}) => {
	return (
		<div className='flex-shrink-0 flex flex-col items-center gap-y-[0.4rem]'>
			<div
				className={c(
					'flex-shrink-0 rounded-full flex items-center justify-center border h-[3.5rem] min-w-35',
					COLORS.border[type],
					overrides?.border
				)}
			>
				<p className={c('text-tertiary', COLORS.text[type], overrides?.text)}>{totalErrorCount}</p>
			</div>
			{!!showLabel && (
				<p className={c('text-tertiary', COLORS.text[type], overrides?.text)}>
					{type === 'warning' ? 'Warnings' : 'Errors'}
				</p>
			)}
		</div>
	);
};
