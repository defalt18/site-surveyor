import React from 'react';
import c from 'classnames';
import { isEmpty, map, size } from 'lodash';
import { ErrorAccordionProps, STATUS_TYPE } from '../../molecules/feature-layout/types';
import ArrowDrop from '../../assets/icons/ArrowDrop';
import { css } from '@emotion/css';

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

const gridAutoStyles = css`
	grid-template-columns: max-content auto;
`;

const renderValue = (className: string, value: string, meta: boolean | undefined) =>
	meta ? (
		<a className={c('no-underline hover:underline', className, 'text-blue-400')} href={value}>
			{value}
		</a>
	) : (
		<p className={c('text-dark-primary', className)}>{value}</p>
	);

export const ErrorRenderer = (error: any, index: number) => {
	const { records } = error;
	if (isEmpty(records)) return null;
	const isSingleRecord = size(records) === 1;
	return (
		<div
			key={index}
			className={c(
				'grid gap-y-3 w-full gap-x-8 bg-white border border-t-0 border-brown-primary px-[1.9rem] py-[0.9rem] last:rounded-b-lg',
				{ 'py-[2.1rem]': isSingleRecord },
				gridAutoStyles
			)}
		>
			{map(records, ({ key, value, meta }) => {
				return (
					<>
						<p className='text-tertiary text-gray-primary flex-shrink-0'>{key}</p>
						{renderValue('text-tertiary flex-shrink overflow-ellipsis line-clamp-3', value, meta)}
					</>
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
	tags,
	tips,
}: ErrorAccordionProps) => {
	const [showErrors, toggle] = React.useState<boolean>(false);
	const [itemCount, setCount] = React.useState<number>(Math.min(10, errorCount));

	const showMore = () => setCount((count) => Math.min(count + 10, errorCount));
	return (
		<div key={title} className='rounded-lg'>
			<div
				className={c(
					'px-[1.8rem] py-4 flex flex-row text-white text-primary justify-between rounded-lg gap-x-[2rem] w-full',
					COLORS.background[type],
					{ 'rounded-b-none': showErrors }
				)}
			>
				<div className='flex flex-col justify-center'>
					<p className='text-white text-secondary overflow-ellipsis line-clamp-3'>{title}</p>
					{!isEmpty(tags) && (
						<div className='flex flex-row gap-x-[0.8rem] flex-wrap items-center mt-[0.6rem]'>
							{tags.map(({ name, color = 'bg-orange-primary' }) => (
								<div
									className={c(
										'rounded-lg text-white px-[0.8rem] py-[0.4rem] text-tertiary',
										color
									)}
									key={name}
								>
									{name}
								</div>
							))}
						</div>
					)}
				</div>
				<div className='flex flex-row items-center flex-shrink-0 h-full gap-x-[2rem]'>
					{type !== 'success' && (
						<ErrorCircle
							type={type}
							totalErrorCount={errorCount}
							errorCountAdjustment={
								errorCount > 500 ? '500+' : errorCount > 100 ? '100+' : `${errorCount}`
							}
							showLabel={false}
							size={28}
							overrides={{
								text: c('text-white', { 'px-2': errorCount > 99 }),
								border: 'border-white',
							}}
						/>
					)}
					<button
						onClick={() => toggle(!showErrors)}
						className={c('w-[2.8rem] h-[2.8rem]', {
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
					{map(tips, TipRenderer)}
				</>
			)}
		</div>
	);
};

const getSizeStyles = (size: number) => {
	return css`
		height: ${size / 10}rem;
		min-width: ${size / 10}rem;
	`;
};

const SHAPE_STYLES = {
	circle: 'rounded-full flex items-center justify-center',
	rect: 'px-[1.6rem] py-[0.4rem] rounded-large',
};

const getLabel = (type: STATUS_TYPE, count: number) => {
	if (type === 'error') return 'Errors';
	if (type === 'warning') return 'Warnings';
	if (type === 'success' && count > 0) return 'Points of Inclusions';
	return 'Errors';
};

export const ErrorCircle = ({
	size = 35,
	type,
	totalErrorCount,
	errorCountAdjustment,
	label,
	shape = 'circle',
	showLabel = true,
	overrides,
}: {
	size?: number;
	type: STATUS_TYPE;
	totalErrorCount: number;
	errorCountAdjustment?: string;
	shape?: 'rect' | 'circle';
	label?: string;
	showLabel?: boolean;
	overrides?: { text?: string; border?: string; label?: string; container?: string };
}) => {
	const sizeStyles = React.useMemo(() => getSizeStyles(size), [size]);
	return (
		<div
			className={c('flex-shrink-0 flex flex-col items-center gap-y-[0.7rem]', overrides?.container)}
		>
			<div
				className={c(
					'flex-shrink-0 border',
					SHAPE_STYLES[shape],
					COLORS.border[type],
					{ [sizeStyles]: shape === 'circle' },
					overrides?.border
				)}
			>
				<p className={c('text-tertiary', COLORS.text[type], overrides?.text)}>
					{errorCountAdjustment ?? totalErrorCount}
				</p>
			</div>
			{!!showLabel && (
				<p
					className={c(
						'text-tertiary overflow-ellipsis line-clamp-1 text-center',
						COLORS.text[type],
						overrides?.label
					)}
				>
					{label ? label : getLabel(type, totalErrorCount)}
				</p>
			)}
		</div>
	);
};

export const TipRenderer = (tip: { description: string }, index: number, arr: Array<any>) => (
	<div
		key={index}
		className='bg-mocha-secondary/50 border border-brown-primary border-t-0 p-[2rem] last:rounded-b-lg'
	>
		<p className='text-green-primary text-primary mb-4'>Tip {size(arr) > 1 ? index + 1 : ''}</p>
		<p
			className='text-tertiary text-dark-primary'
			dangerouslySetInnerHTML={{ __html: tip?.description }}
		/>
	</div>
);

export const getComponent = (Component: React.ComponentType<any>) => <Component />;
