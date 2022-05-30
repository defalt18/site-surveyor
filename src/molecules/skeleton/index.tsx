import * as React from 'react';
import c from 'classnames';

interface SkeletonContent {
	title: string;
	description: string;
	className?: string;
}

const SkeletonIntroduction = ({ className, title, description }: SkeletonContent) => {
	return (
		<div
			className={c('px-[1.5rem] pt-[2.7rem] pb-[1.7rem] bg-brown-primary/10 rounded-lg', className)}
		>
			<p className='text-primary text-dark-primary mb-[0.5rem]'>{title}</p>
			<p className='text-secondary py-[1.1rem] text-gray-primary rounded-lg'>{description}</p>
		</div>
	);
};

const SkeletonSection: React.FC<{
	className?: string;
	title?: string;
	renderTitle?: () => JSX.Element;
	disabled?: boolean;
	buttonLabel?: string;
	onClick?: (props?: any) => any;
	titleClassName?: string;
	children?: React.ReactElement<any> | Iterable<React.ReactNode>;
}> = (props) => {
	const {
		className,
		title,
		titleClassName,
		onClick,
		disabled,
		buttonLabel = 'Test',
		renderTitle,
	} = props;
	return (
		<div className={c('bg-brown-primary/10 p-[1.5rem]', className)}>
			<div className='w-full flex flex-row items-center justify-between'>
				{renderTitle ? (
					renderTitle()
				) : title ? (
					<p className={c('text-dark-primary text-primary', titleClassName)}>{title}</p>
				) : null}
				{!!onClick && (
					<button
						disabled={disabled}
						onClick={onClick}
						className={c(
							'border border-lilac-primary rounded-4xl w-[10rem] h-[3.2rem] text-primary text-light-primary bg-navy-primary',
							{ 'bg-navy-primary/20': disabled }
						)}
					>
						{buttonLabel}
					</button>
				)}
			</div>
			{props.children}
		</div>
	);
};

export { SkeletonIntroduction, SkeletonSection };
