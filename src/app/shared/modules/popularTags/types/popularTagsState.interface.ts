import { PopularTagType } from "src/app/shared/types/popularTagType.interface";

export interface PopularTagsStateInterface {
  data: PopularTagType[] | null;
  error: string | null;
  isLoading: boolean;
}