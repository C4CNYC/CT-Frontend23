// ----------------------------------------------------------------------

export interface IUserSocialLink {
  facebookLink: string;
  instagramLink: string;
  linkedinLink: string;
  twitterLink: string;
}

export interface IUserProfileFollowers {
  follower: number;
  following: number;
}

export interface IUserProfileCover {
  name: string;
  cover: string;
  role: string;
}

export interface IUserProfileAbout {
  quote: string;
  country: string;
  email: string;
  role: string;
  company: string;
  school: string;
}

export type IUserProfile = IUserProfileFollowers &
  IUserProfileAbout & {
    id: string;
    socialLinks: IUserSocialLink;
  };

export interface IUserProfileFollower {
  id: string;
  avatarUrl: string;
  name: string;
  country: string;
  isFollowed: boolean;
}

export interface IUserProfileGallery {
  id: string;
  title: string;
  postAt: Date | string | number;
  imageUrl: string;
}

export interface IUserProfileFriend {
  id: string;
  avatarUrl: string;
  name: string;
  role: string;
}

export interface IUserProfilePost {
  id: string;
  author: {
    id: string;
    avatarUrl: string;
    name: string;
  };
  isLiked: boolean;
  createdAt: Date | string | number;
  media: string;
  message: string;
  personLikes: Array<{
    name: string;
    avatarUrl: string;
  }>;
  comments: Array<{
    id: string;
    author: {
      id: string;
      avatarUrl: string;
      name: string;
    };
    createdAt: Date | string | number;
    message: string;
  }>;
}

// ----------------------------------------------------------------------

export interface IUserCard {
  id: string;
  avatarUrl: string;
  cover: string;
  name: string;
  follower: number;
  following: number;
  totalPosts: number;
  role: string;
}

// ----------------------------------------------------------------------

export interface IUserAccountGeneral {
  id: string;
  avatarUrl: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  company: string;
  isVerified: boolean;
  status: string;
  role: string;
}

export interface IUserAccountBillingCreditCard {
  id: string;
  cardNumber: string;
  cardType: string;
}

export interface IUserAccountBillingInvoice {
  id: string;
  createdAt: Date | string | number;
  price: number;
}

export interface IUserAccountBillingAddress {
  id: string;
  name: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  street: string;
  zipCode: string;
}

export interface IUserAccountChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

// ----------------------------------------------------------------------

export interface IUserAccountNotificationSettings {
  activityComments: boolean;
  activityAnswers: boolean;
  activityFollows: boolean;
  applicationNews: boolean;
  applicationProduct: boolean;
  applicationBlog: boolean;
}

export interface ILessonUserStatus {
  id: string;
  status: string;
}