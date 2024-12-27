import { BaseResponseInterface } from "@root/src/utils";


export interface IAccessControl {
    id: string;
    feature: string;
    maxUsageCount: string;
    userId: string;
}

export type IAccessControlResponse = IAccessControl & BaseResponseInterface
export type IAccessControlsResponse = IAccessControlResponse[]