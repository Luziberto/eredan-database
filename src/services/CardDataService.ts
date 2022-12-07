import http from "@/plugins/axios"
// import { GetAssetsRequestData, SearchAssetsRequestData } from "@/types/Asset/RequestData"
// import { GetAssetsResponseData } from "@/types/Asset/ResponseData"
import {AxiosResponse} from "axios"
import CardJson from "@/assets/cards.json"

class CardDataService {
  // getAssets(data: GetAssetsRequestData): Promise<AxiosResponse> {
  //   return http.post<GetAssetsResponseData[]>("/assets", data)
  // }

  // getAllAssets(page: number, itemsPerPage: number): Promise<AxiosResponse> {
  //   return http.post<GetAssetsResponseData[]>("/assets", { assets: CardJson.slice((page - 1) * itemsPerPage, page * itemsPerPage) })
  // }
}

export default new CardDataService
