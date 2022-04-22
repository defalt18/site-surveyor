import React from 'react';
import { ErrorAccordionProps } from '../../../../molecules/feature-layout/types';
import { map } from 'lodash';

export default function ContrastErrorAccordion(props: ErrorAccordionProps) {
	const { subErrors } = props;
	return (
		<div className='flex flex-col gap-y-3'>
			{map(subErrors, (error, index) => {
				const foregroundStyles = { backgroundColor: error.foreground };
				const backgroundStyles = { backgroundColor: error.background };
				return (
					<div
						key={index}
						className='border-2 border-brown-primary flex flex-row justify-between items-center p-8'
					>
						<p className='text-secondary text-dark-primary flex-grow overflow-ellipsis line-clamp-2'>
							{error.text}
						</p>
						<p className='text-secondary text-dark-primary flex-shrink-0 mx-8'>{error.ratio} : 1</p>
						<div className='flex flex-row items-center gap-x-2 flex-shrink-0'>
							<div className='h-6 w-6 border border-brown-primary' style={foregroundStyles} />
							<div className='h-6 w-6 border border-brown-primary' style={backgroundStyles} />
						</div>
					</div>
				);
			})}
		</div>
	);
}
