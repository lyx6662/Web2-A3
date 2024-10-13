export interface FundraiserDetails {
    FUNDRAISER_ID: number;  
    ORGANIZER: string;  
    CAPTION: string;  
    TARGET_FUNDING: number;
    CURRENT_FUNDING: number;
    CITY: string;  
    ACTIVE: number;
    CATEGORY_NAME: string;  
    CATEGORY_ID: number;
}

export interface Category {
    CATEGORY_ID:number;
    NAME :string;
}


export interface Donation{
    DONATION_ID :number;
    DATE :Date;
    AMOUNT:number;
    GIVER :string;
    FUNDRAISER_ID :number;
}

export interface Search {
    ORGANIZER: string;  
    CITY: string;  
    CATEGORY_NAME: string;  
}


export interface InputA {
    Giver: string;  
    Amount: number; 
    FUNDRAISER_ID :number;
}