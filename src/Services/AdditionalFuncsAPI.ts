import { ApiKeyInstance } from '../Utils/Fetch';
import { ContentObjectType } from '../Interfaces/data/additionalFuncs';

export const AdditionalFuncsAPI = {
  getContent: (kind: string) => ApiKeyInstance.get(`/content?kind=${kind}`),
  postContent: ({
                  name, kind, source,
                }: ContentObjectType) => ApiKeyInstance.post(
    `/content`,
    {
      name,
      priority:0,
      kind,
      source,
    }),
  deleteContent:(content_name:string)=> ApiKeyInstance.delete(`/content/${encodeURIComponent(content_name)}`)
};

export const getContent = async (kind: string) => {
  const res = await ApiKeyInstance.get<ContentObjectType[]>(
    `/content?kind=${kind}`,
  );
  return res.data;
};