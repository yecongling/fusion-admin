/**
 * 枚举端点相关的请求API
 */

export enum Api {
    addEndpoint = '/system/endpoint/addEndpoint',
    deleteEndpoint = '/system/endpoint/deleteEndpoint',
    deleteEndpointBatch = '/system/endpoint/deleteEndpointBatch',
    exportEndpoints = '/system/endpoint/export',
    getAllEndpoints = '/system/endpoint/getAllEndpoints',
    getEndpointList = '/system/endpoint/getEndpointList',
    importEndpoints = '/system/endpoint/import',
    updateEndpoint = '/system/endpoint/updateEndpoint'
}