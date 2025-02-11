import {
	IExecuteFunctions,
	INodeType,
	INodeTypeDescription,
	INodeExecutionData,
	NodeOperationError
 } from 'n8n-workflow';
 import { DuckDBInstance } from '@duckdb/node-api';

export class DuckdbNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'DuckDB integration for n8n',
		name: 'duckdbNode',
		icon: 'file:duckdb.svg',
		group: ['input'],
		version: 1,
		description: 'Execute queries on DuckDB',
		defaults: {
			name: 'DuckDB Node',
		},
		//@ts-ignore
		inputs: ['main'],
		//@ts-ignore
		outputs: ['main'],
		properties: [
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				default: '',
				required: true,
				description: 'SQL query to execute',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
				const query = this.getNodeParameter('query', i) as string;

				try {
						const instance = await DuckDBInstance.create();
						const connection = await instance.connect();
						const reader = await connection.runAndReadAll(query)

						returnData.push({ json: { result: reader.getRows() } });
				} catch (error) {
					throw new NodeOperationError(this.getNode(), error);
				}
		}
		return this.prepareOutputData(returnData);
	}
}
