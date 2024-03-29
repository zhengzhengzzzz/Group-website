import type {
  Emailparams,
  IResultData,
  loginparams,
  LoginRes,
  sendEmailparams,
} from "~/types/Userlogin";
import Hyrequire from "./index";
import type {
  blogitem,
  Filelistprops,
  Filetag,
  Homestoreuserinfo,
  Hotnews,
  NewsRoot,
  Tagparams,
  WrapperType,
} from "~/types/Home";
import type { Filelist, FilePrevviewList } from "~/types/disk";
//账号密码登录
export function Userloginany(logininfo: loginparams) {
  return Hyrequire.request<IResultData<LoginRes>>(
    "/api/user/user/loginByPassword",
    "POST",
    {
      ...logininfo,
    }
  );
}
//发送验证码
export function sendEmeil(params: sendEmailparams) {
  return Hyrequire.request<IResultData<any>>(
    "/api/user/user/sendEmail",
    "POST",
    {
      ...params,
    }
  );
}
//邮箱登录
export function Userloginemail(params: Emailparams) {
  return Hyrequire.request<IResultData<any>>(
    "/api/user/user/loginByEmail",
    "POST",
    {
      ...params,
    }
  );
}
//获取用户信息
export function getUserinfo2(account: any) {
  return Hyrequire.request<IResultData<Homestoreuserinfo>>(
    "/api/user/user/getLoginUserByPassword",
    "GET",
    {
      account,
    }
  );
}
//获取全部博客
export function getAllblog() {
  return Hyrequire.request<
    IResultData<{
      [key: string]: blogitem[];
    }>
  >("/api/user/user/selectBlog", "GET");
}
//查询所有标签
export function getAlltag() {
  return Hyrequire.request<IResultData<Filetag[]>>(
    "/api/disk/type/selectAllTypes",
    "GET"
  );
}
//收藏文件
export function Favoritefile(fileId: number) {
  return Hyrequire.request("/api/disk/file/collectionFile", "PUT", {
    fileId,
    userId: Authuserid(),
  });
}
//获取文件列表
export function getFilelist(params: Filelistprops) {
  return Hyrequire.request<IResultData<Filelist>>(
    "/api/disk/file/getAllUploadFileList",
    "GET",
    {
      ...params,
    }
  );
}
//标签筛选
export function getFileTaglist(params: Tagparams) {
  console.log(params.types);
  return Hyrequire.request<IResultData<Filelist>>(
    `/api/disk/file/getFileListByTypes?${params.types}&pageSize=${
      params.pageSize
    }&index=${params.index}&userId=${Authuserid()}`,
    "GET"
  );
}
//我的收藏
export function GetMylovefile(params: Tagparams) {
  return Hyrequire.request<IResultData<Filelist>>(
    `/api/disk/file/getCollectionList?pageSize=${params.pageSize}&index=${
      params.index
    }&userId=${Authuserid()}`,
    "GET"
  );
}
//获取首页轮播图
export function GetWrapper() {
  return Hyrequire.get<IResultData<WrapperType[]>>(
    "/api/user/carousel/selectAllCarousel"
  );
}
// 热点新闻 这是那个usefetch请求
export function GetHotnews(params: Hotnews) {
  return Hyrequire.get<IResultData<NewsRoot>>("/api/notice/news/select", {
    ...params,
  });
}
// 获取文件预览图
export function getFilePreviewList(fileId: number) {
  return Hyrequire.get<IResultData<FilePrevviewList[]>>(
    "/api/disk/file/getFilePreviewList",
    {
      fileId,
    }
  );
}
//退出登录
export function Loginout() {
  return Hyrequire.get("/api/user/user/loginOut");
}
