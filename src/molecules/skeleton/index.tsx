import * as React from 'react';
import c from 'classnames';

interface SkeletonContent {
	title: string;
	description: string;
	className?: string;
}

const SkeletonIntroduction = ({ className, title, description }: SkeletonContent) => {
	return (
		<div className={c('px-[1.5rem] pt-[2.7rem] pb-[1.7rem] bg-brown-primary/10', className)}>
			<p className='text-primary text-dark-primary mb-[1.9rem]'>{title}</p>
			<p className='text-secondary px-[1.2rem] py-[1.1rem] bg-muave-secondary text-white rounded-lg'>
				{description}
			</p>
		</div>
	);
};

const SkeletonSection: React.FC<{
	className?: string;
	title?: string;
	titleClassName?: string;
	children?: React.ReactNode;
}> = (props) => {
	const { className, title, titleClassName } = props;
	return (
		<div className={c('bg-brown-primary/10 p-[1.5rem]', className)}>
			<p className={c('text-dark-primary text-primary', titleClassName)}>{title}</p>
			{props.children}
		</div>
	);
};

export { SkeletonIntroduction, SkeletonSection };
