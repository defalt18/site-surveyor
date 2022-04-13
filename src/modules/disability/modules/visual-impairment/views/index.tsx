import * as React from 'react';
import c from 'classnames';
import { SkeletonIntroduction, SkeletonSection } from '../../../../../molecules/skeleton';
import usePageDom from '../../../../hooks/usePageDom';

const VisualImpairment = () => {
	const { loading: disabled, dom } = usePageDom();
	const getActivePageModel = React.useCallback(() => {
		console.log(dom);
	}, [dom]);

	return (
		<div className='flex flex-col gap-y-[0.8rem] flex-grow'>
			<SkeletonIntroduction
				className='rounded-lg'
				title='Visual Impairment'
				description='World Health Organization (WHO) estimates that there are 246 million people worldwide who have low vision and 39 million people are blind, indicating that 86% of the people with visual impairments have low vision.'
			/>
			<SkeletonSection
				title='Accessibility check-points'
				className='flex flex-col flex-1 rounded-lg'
			>
				<div className='grid grid-cols-2 gap-x-[0.9rem] gap-y-[0.8rem] mt-[2.8rem]'>
					<div className='rounded-lg h-[10.2rem] text-primary text-white flex items-center bg-brown-primary pl-[2rem]'>
						<p className='w-4/6 text-light-primary text-primary'>Text</p>
					</div>
					<div className='rounded-lg h-[10.2rem] text-primary text-white flex items-center bg-brown-primary pl-[2rem]'>
						<p className='w-4/6 text-light-primary text-primary'>Contrast</p>
					</div>
				</div>
				<button
					disabled={disabled}
					onClick={getActivePageModel}
					className={c(
						'self-center mt-16 rounded-4xl w-[13.6rem] h-[4rem] text-primary text-light-primary bg-navy-primary',
						disabled ? 'bg-navy-primary/20' : 'bg-navy-primary'
					)}
				>
					Test
				</button>
			</SkeletonSection>
		</div>
	);
};

export default VisualImpairment;
