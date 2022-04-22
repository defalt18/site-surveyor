import { ReactNode, ComponentType } from 'react';

export type AnalysisErrors = Record<
	string,
	{
		name: string;
		type: 'success' | 'warning' | 'error';
		count: number;
		errors?: Array<{
			title: string;
			errorType?: 'error' | 'warning';
			subErrorCount: number;
			subErrors?: Array<any>;
		}>;
	}
>;

export interface LayoutContainerProps {
	title: string;
	description?: string;
	errorRenderer: (error: any, index: number) => ReactNode;
	checkpoints: Array<{
		name: string;
		icon?: (props?: any) => JSX.Element;
		tags?: Array<{ name: string; color: string }>;
		tips?: Array<{ description: string }>;
		ErrorAccordion?: ComponentType<any>;
	}>;
	testingEnabled?: boolean;
	checkUtility: (dom: Document, tabId: number) => Promise<AnalysisErrors>;
}

export interface ErrorAccordionProps {
	title: string;
	type: 'error' | 'warning' | 'success';
	errorCount?: number;
	subErrors?: Array<any>;
	ErrorRenderer?: LayoutContainerProps['errorRenderer'];
}
