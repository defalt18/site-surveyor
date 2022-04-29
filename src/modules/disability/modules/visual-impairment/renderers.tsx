import React from 'react';
import { map } from 'lodash';

export default function ContrastErrorRenderer(error: any, index: number) {
	const { records } = error;
	return (
		<div
			key={index}
			className='flex flex-col gap-y-3 bg-white border border-t-0 border-brown-primary px-[1.9rem] py-[0.9rem] last:rounded-b-lg'
		>
			{map(records as Array<any>, ({ key, value, foreground, background }, ind) => {
				const isLast = ind === records.length - 1;
				const foregroundStyles = isLast ? { backgroundColor: foreground } : null;
				const backgroundStyles = isLast ? { backgroundColor: background } : null;
				return (
					<div key={ind} className='flex flex-row gap-x-2'>
						<p className='text-tertiary text-gray-primary flex-shrink-0 w-3/12'>{key}</p>
						{!isLast ? (
							<p className='text-tertiary text-dark-primary line-clamp-1 overflow-ellipsis'>
								{value}
							</p>
						) : (
							<div className='flex flex-row items-center gap-x-2 flex-shrink-0'>
								<div className='h-6 w-6 border border-brown-primary' style={foregroundStyles} />
								<div className='h-6 w-6 border border-brown-primary' style={backgroundStyles} />
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
}
