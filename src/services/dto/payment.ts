export interface IVerifyBank {
    account_number: string;
    bank_code: string;
}

export interface IAddBank extends IVerifyBank {
    account_name: string;
}