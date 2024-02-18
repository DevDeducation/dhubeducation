export interface iButton {
  text: string;
  isAnchorLink: boolean;
  href?: string;
  btnType?: "submit" | "button";
  padding?: string;
  height?: string;
  otherclasses?: string;
  borderradius?: string;
  dataname?: string;
  width?: string;
}

export interface iButtonOptions {
  padding?: string;
  height?: string;
  otherclasses?: string;
  width?: string;
  borderradius?: string;
}

export interface DateTimeFormatOptions {
  year: "numeric" | "2-digit" | undefined;
  month: "numeric" | "2-digit" | "short" | "long" | "narrow" | undefined;
  day: "numeric" | "2-digit" | undefined;
}

export interface iHero {
  title: string;
  subline?: string[];
  cta: boolean;
  href?: string;
  isHome?: boolean;
  height?: string;
  backgroundImage?: string;
}

export interface iHeroLoad {
  slider: iSlider;
}

export interface iSector {
  name: string;
  img: string;
  content: string;
}

export interface iSlide {
  name: string;
  type: string;
  slug: string;
  list: string[];
}

export interface iSlider {
  order: number;
  background: string;
  title: string;
  subline: string;
  href: string;
  text: string;
}

export interface iService {
  order: number;
  name: string;
  description: string;
  landscapepic: string;
  squarepic: string;
  slug: string;
  body: {
    type: string;
    children: Record<string, any>[]
  }
  content?: any
}

export interface iBlog {
  title: string;
  banner: string;
  thumbnail: string;
  caption: string;
  date: string;
  category: string;
  body?: {
    type: string;
    children: Record<string, any>[]
  }
  content?: any;
  slug: string;
}
export interface iAffiliate {
  type: string;
  caption: string;
  squarepic: string;
  landscapepic: string;
  body?: {
    type: string;
    children: Record<string, any>[]
  }
  content?: any;
  slug: string;
}

export interface iPartner {
  name: string;
  type: string;
  website: string;
  logo: string;
  squarepic: string;
  landscapepic: string;
  country: string;
  countrycode: string;
  latitude: string;
  longitude: string;
  body?: {
    type: string;
    children: Record<string, any>[]
  },
  content?: any;
  slug: string;
}

export type TCollection = "services" | "slides" | "affiliates" | "blog" | "schools"


export type TAffiliate = "employee" | "vendor" | "teacher" | "customer" | "influencer"

export type TService = "affiliate program" | "tuition payment" | "accommodation" | "dhub career" | "guardianship" | "immigration & recruitment"

export type TPlayMedia = "play-video" | "play-audio" | "play-image" | "play-newsletter"

export interface iMedia {
  src: string;
  header: string;
  footer: string;
}

export interface iAffiliateLoad {
  affiliate: iAffiliate;
  affiliates: iAffiliate[]
}

export interface iPartnerLoad {
  partner: iPartner;
  partners: iPartner[]
}

export interface iServiceLoad {
  service: iService;
  services: iService[]
}

export interface iBlogLoad {
  blog: iBlog;
  blogs: iBlog[]
}

// export interface iUser {
//   iss: string;
//   azp: string;
//   aud: string;
//   sub: string;
//   email: string;
//   email_verified: boolean;
//   at_hash: string;
//   name: string;
//   picture: string; 
//   given_name: string;
//   family_name: string;
//   locale: string;
//   iat: number;
//   exp: number;
// }
export interface iSession {
  uid: string;
  email: string | undefined;
  picture: string; 
  name: string;
  signedIn: boolean;
}
export interface iDocument {
  collectionId: string;
  docId: string;
  data: Record<string, any>
}

export interface iQuery {
  collectionId: string;
  where?: iWhere
}

export interface iWhere {
  key: string;
  op: "<" | "<=" | "==" | ">" | ">=" | "!=" | "array-contains" | "array-contains-any" | "in" | "not-in"
  value: string
}

export type TStatus = "success" | "error"

export interface iFBResponse {
  message: string;
  status: TStatus;
  data?: any
} 

export interface iEmailPassword {
  email: string;
  password: string;
}

export type TAlert = "success" | "error" | "warning" | "info"

export interface iAlert {
  type: TAlert;
  message: string;
  active: boolean
}

export interface iReferee {
  id?: number;
  address: string;
  authtype?: string;
  countryCode: string;
  countryName: string;
  countryIsoCode: string;
  countryOfInterest: string;
  email: string;
  levelOfStudy: string;
  name: string;
  phoneNumber: string; 
  role?: string;
  typeOfReferral: string;
  referer: string;
  timestamp?: string;
  confirmed: string;
  paid: string;
  actions?: any;
  nameOfSchool?: string;
  tuition?: string;
  currency?: string;
  yearOfStudy?: string;
}

export interface iUser extends iReferee {
  paymentMethod: string;
  paypalEmail?: string;
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
  sortCode?: string;
  swiftCode?: string;
}


export interface iDashboard {
  url: string;
  color: string;
  kpi: string;
  name: string;
  cta: string;
  iconclasses: string;
  legend: string;
}

export interface iGlobalScale {
  num: number;
  text: string;
}

export interface iStatusColor {
  status: string;
  color: string;
}

type ImgProps = {
	src: string;
	w: number;
};

type ImgPropsH = ImgProps & { h: number };

export type ImgMeta = { img: ImgPropsH; sources: { [key: string]: string } };

export interface iPicture {
  loading: "lazy" | "eager",
  role?: string;
  srcset?: string;
  src: string;
  alt: string;
  sizes: string;
  decoding?: string;
  fetchpriority?: string;
}

export interface iPopup {
  active: boolean;
  name: string;
  startdate: string;
  enddate: string;
  image: string;
}

export interface iPopupState {
  popup: iPopup;
  isLive: boolean;
  startTimestamp: number;
}