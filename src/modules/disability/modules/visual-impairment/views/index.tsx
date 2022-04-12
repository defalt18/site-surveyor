import * as React from 'react';
import SkeletonIntroduction from '../../../../../molecules/skeleton';

const VisualImpairment = () => {
	return (
		<div className='flex flex-col gap-y-[0.8rem]'>
			<SkeletonIntroduction
				title='Visual Impairment'
				description='World Health Organization (WHO) estimates that there are 246 million people worldwide who have low vision and 39 million people are blind, indicating that 86% of the people with visual impairments have low vision.'
			/>
			<div className='bg-light-primary p-[1.5rem] flex flex-col'>
				<p className='text-dark-primary text-primary'>Accessibility check-points</p>
				<div className='grid grid-cols-2 gap-x-[0.9rem] gap-y-[0.8rem] mt-[2.8rem]'>
					<div className='rounded-lg h-[10.2rem] text-primary text-white flex items-center bg-brown-primary pl-[2rem]'>
						<p className='w-4/6 text-light-primary text-primary'>Text</p>
					</div>
					<div className='rounded-lg h-[10.2rem] text-primary text-white flex items-center bg-brown-primary pl-[2rem]'>
						<p className='w-4/6 text-light-primary text-primary'>Contrast</p>
					</div>
				</div>
				<button className='self-center mt-16 rounded-4xl w-[13.6rem] h-[4rem] text-primary text-light-primary bg-navy-primary'>
					Test
				</button>
			</div>
		</div>
	);
};

export default VisualImpairment;
