import React from 'react';
import c from 'classnames';
import { keyBy, map, size } from 'lodash';
import { LayoutContainerProps } from './types';
import { SkeletonSection } from '../skeleton';
import { LayoutContext } from './Layout.container';
import { VIEWS } from './consts';
import { DefaultErrorAccordion, ErrorCircle } from '../../modules/utils/renderers';

const LayoutReport = (props: LayoutContainerProps) => {
	const { title, checkpoints, errorRenderer: AnalysisErrorRenderer } = props;
	const {
		screen: { checkpoint },
		setView,
		errors,
	} = React.useContext(LayoutContext);

	const type = errors[checkpoint].type;
	const { tags, tips, ErrorAccordion } = React.useMemo(
		() => keyBy(checkpoints, 'name')[checkpoint],
		[checkpoints, checkpoint]
	);
	const totalErrorCount = errors[checkpoint].count;
	const checkpointErrors = errors[checkpoint].errors;

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
				<div className='flex flex-col gap-y-[1.8rem]'>
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
				<ErrorCircle type={type} totalErrorCount={totalErrorCount} />
			</div>
			<div className='flex flex-col gap-y-[1.4rem]'>
				{map(checkpointErrors, ({ title, subErrorCount, subErrors, errorType = 'error' }) => {
					const Component = ErrorAccordion || DefaultErrorAccordion;
					return (
						<Component
							title={title}
							key={title}
							subErrors={subErrors}
							errorCount={subErrorCount}
							ErrorRenderer={AnalysisErrorRenderer}
							type={errorType}
						/>
					);
				})}
			</div>
			{map(tips, (tip, index, arr) => (
				<div className='bg-mocha-secondary/50 border border-brown-primary p-[2rem] mt-[6.6rem]'>
					<p className='text-green-primary text-primary mb-4'>
						Tip {size(arr) > 1 ? index + 1 : ''}
					</p>
					<p className='text-tertiary text-dark-primary'>{tip?.description}</p>
				</div>
			))}
		</SkeletonSection>
	);
};

export default React.memo(LayoutReport);
