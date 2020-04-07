
interface IStoriesModelConstants {
    titleMin: number;
    titleMax: number;
    privacyMin: number;
    privacyMax: number;
}

const constants: IStoriesModelConstants = {
    titleMin: 1,
    titleMax: 255,
    privacyMin: 1,
    privacyMax: 10,
};

export const storiesModelConstants = constants;
