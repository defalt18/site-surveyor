import React from 'react';
import c from 'classnames';
import { map } from 'lodash';

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
		<div className='flex flex-col gap-y-2 bg-white border border-t-0 border-brown-primary px-[1.9rem] py-[0.9rem] last:rounded-b-lg'>
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
