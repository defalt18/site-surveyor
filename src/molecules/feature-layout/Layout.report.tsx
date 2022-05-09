import React from 'react';
import c from 'classnames';
import { keyBy, map, groupBy, values, reduce, sumBy } from 'lodash';
import { LayoutContainerProps } from './types';
import { SkeletonSection } from '../skeleton';
import { VIEWS } from './consts';
import { DefaultErrorAccordion, ErrorCircle, TipRenderer } from '../../modules/utils/renderers';
import useLayoutContext from './hooks/useLayoutContext';

const LayoutReport = (props: LayoutContainerProps) => {
	const { title, checkpoints, errorRenderer: AnalysisErrorRenderer } = props;
	const {
		screen: { checkpoint },
		setView,
		errors,
	} = useLayoutContext();

	const { tags, tips, ErrorAccordion, errorRenderer } = React.useMemo(
		() => keyBy(checkpoints, 'name')[checkpoint],
		[checkpoints, checkpoint]
	);
	const checkpointErrors = errors[checkpoint].errors;

	const classifiedErrors = React.useMemo(
		() =>
			reduce(
				values(groupBy(checkpointErrors, 'errorType')),
				(acc, item) => {
					const sumOfItems = sumBy(item, 'subErrorCount');
					return [
						...acc,
						{
							errorType: item[0].errorType,
							subErrorCount: sumOfItems,
						},
					];
				},
				[]
			),
		[checkpointErrors]
	);

	const renderTitle = () => (
		<div className='flex flex-row items-center gap-x-2'>
			<button
				className='text-dark-primary text-primary hover:underline'
				onClick={() => setView({ view: VIEWS.DETAILS })}
			>
				{title}
			</button>
			<p className='text-dark-primary text-primary'>
				{' '}
				{'>'} {checkpoint}
			</p>
		</div>
	);

	return (
		<SkeletonSection renderTitle={renderTitle} className='flex flex-col flex-1 rounded-lg'>
			<div className='my-[2rem] rounded-lg border border-brown-primary flex flex-row justify-between items-center p-[2rem] bg-white'>
				<div className='flex flex-col gap-y-[1.2rem]'>
					<p className='text-primary text-dark-primary'>{checkpoint}</p>
					{!!tags && (
						<div className='flex flex-row gap-x-[0.8rem] flex-wrap'>
							{tags.map(({ name, color }) => (
								<div
									className={c('rounded-lg text-white px-[1.7rem] py-[0.3rem]', color)}
									key={name}
								>
									{name}
								</div>
							))}
						</div>
					)}
				</div>
				<div className='flex flex-row items-center flex-shrink-0 gap-x-4'>
					{map(classifiedErrors, ({ errorType, subErrorCount }, index) => (
						<ErrorCircle
							type={errorType}
							totalErrorCount={subErrorCount}
							shape='rect'
							key={index}
							label={errorType === 'success' ? 'Points of Inclusion' : undefined}
							overrides={{
								text: 'text-primary',
							}}
						/>
					))}
				</div>
			</div>
			<div className='flex flex-col gap-y-[1.4rem]'>
				{map(
					checkpointErrors,
					({ tags, tips, title, subErrorCount, subErrors, errorType = 'error' }) => {
						const Component = ErrorAccordion || DefaultErrorAccordion;
						const ErrorRenderer = errorRenderer || AnalysisErrorRenderer;
						return (
							<Component
								title={title}
								key={title}
								tags={tags}
								subErrors={subErrors}
								errorCount={subErrorCount}
								ErrorRenderer={errorType === 'success' ? TipRenderer : ErrorRenderer}
								type={errorType}
								tips={tips}
							/>
						);
					}
				)}
			</div>
			{map(tips, TipRenderer)}
		</SkeletonSection>
	);
};

export default React.memo(LayoutReport);
