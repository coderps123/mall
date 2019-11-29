import {request} from "./request";

export function getCategory() {
  return request({
    url: '/api/v1/category'
  })
}

export function getSubcategory(maitKey) {
  return request({
    url: '/api/v1/subcategory',
    params: {
      maitKey
    }
  })
}

export function getSubcategoryDetail(miniWallkey, type, page) {
  return request({
    url: '/api/v1/subcategory/detail',
    params: {
      miniWallkey,
      type,
      page
    }
  })
}