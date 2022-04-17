import { ReactNode } from 'react';

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
		tip?: { description: string };
	}>;
	testingEnabled?: boolean;
	checkUtility: (dom: Document, tabId: number) => Promise<AnalysisErrors>;
}
