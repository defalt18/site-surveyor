import React from 'react';
import c from 'classnames';
import { keyBy, map } from 'lodash';
import { LayoutContainerProps } from './types';
import { SkeletonSection } from '../skeleton';
import { LayoutContext } from './Layout.container';
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

const ErrorCircle = (
	type: 'error' | 'warning' | 'success',
	totalErrorCount: number,
	showLabel: boolean = true,
	overrides?: { text: string; border: string }
) => {
	return (
		<div className='flex-shrink-0 flex flex-col items-center gap-y-[0.4rem]'>
			<div
				className={c(
					'flex-shrink-0 rounded-full flex items-center justify-center border h-[3.5rem] w-[3.5rem]',
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

const ErrorAccordion = ({
	title,
	type,
	errorCount,
	subErrors,
	ErrorRenderer,
}: {
	title: string;
	type: 'error' | 'warning' | 'success';
	errorCount?: number;
	subErrors?: Array<any>;
	ErrorRenderer: LayoutContainerProps['errorRenderer'];
}) => {
	const [showErrors, toggle] = React.useState<boolean>(false);
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
					{ErrorCircle(type, errorCount, false, { text: 'text-white', border: 'border-white' })}
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
			{!!showErrors && map(subErrors, ErrorRenderer)}
		</div>
	);
};

const LayoutReport = (props: LayoutContainerProps) => {
	const { title, checkpoints, errorRenderer: AnalysisErrorRenderer } = props;
	const {
		screen: { checkpoint },
		errors,
	} = React.useContext(LayoutContext);

	const type = errors[checkpoint].type;
	const { tags, tip } = React.useMemo(
		() => keyBy(checkpoints, 'name')[checkpoint],
		[checkpoints, checkpoint]
	);
	const totalErrorCount = errors[checkpoint].count;
	const checkpointErrors = errors[checkpoint].errors;

	return (
		<SkeletonSection title={`${title} > ${checkpoint}`} className='flex flex-col flex-1 rounded-lg'>
			<div className='my-[2rem] rounded-lg border border-brown-primary flex flex-row justify-between items-center p-[2rem] bg-white'>
				<div className='flex flex-col gap-y-[1.8rem]'>
					<p className='text-primary text-dark-primary'>{checkpoint}</p>
					<div className='flex flex-row gap-x-[0.8rem] flex-wrap'>
						{tags.map(({ name, color }) => (
							<div className={c('rounded-lg text-white px-[1.7rem] py-[0.3rem]', color)} key={name}>
								{name}
							</div>
						))}
					</div>
				</div>
				{ErrorCircle(type, totalErrorCount)}
			</div>
			<div className='flex flex-col gap-y-[1.4rem]'>
				{map(checkpointErrors, ({ title, subErrorCount, subErrors, errorType }) => (
					<ErrorAccordion
						title={title}
						key={title}
						subErrors={subErrors}
						errorCount={subErrorCount}
						ErrorRenderer={AnalysisErrorRenderer}
						type={errorType ?? 'error'}
					/>
				))}
			</div>
			{tip && (
				<div className='bg-mocha-secondary/50 border border-brown-primary p-[2rem] mt-[6.6rem]'>
					<p className='text-green-primary text-primary mb-4'>Tip</p>
					<p className='text-tertiary text-dark-primary'>{tip?.description}</p>
				</div>
			)}
		</SkeletonSection>
	);
};

export default React.memo(LayoutReport);
