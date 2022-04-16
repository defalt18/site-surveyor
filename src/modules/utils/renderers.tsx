import React from 'react';
import { map } from 'lodash';

export const ErrorRenderer = (error: any) => {
	const { records } = error;
	return (
		<div className='flex flex-col gap-y-2 bg-white border border-t-0 border-brown-primary px-[1.9rem] py-[0.9rem] last:rounded-b-lg'>
			{map(records, ({ key, value }) => (
				<div className='flex flex-row gap-x-[2rem]'>
					<p className='text-tertiary text-gray-primary flex-shrink-0'>{key}</p>
					<p className='text-tertiary text-dark-primary flex-shrink truncate overflow-ellipsis'>
						{value}
					</p>
				</div>
			))}
		</div>
	);
};
