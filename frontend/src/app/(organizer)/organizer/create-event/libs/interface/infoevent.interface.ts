export interface OrganizationInfoFormProps {
    logoOrg: string | null;
    nameOrg: string;
    infoOrg: string;
    handleUpload: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => void;
    errors: { [key: string]: boolean };
    imageErrors: { [key: string]: string };
}

export interface EventLocationInputProps { 
    eventTypeSelected: string;
    eventAddress: string; 
    province: string; 
    district: string; 
    ward: string; 
    street: string; 
    errors: { [key: string]: boolean }; 
    provinces: string[]; 
    districts: string[]; 
    wards: string[]; 
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void; 
    handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>, field: string) => void; 
    setEventTypeSelected: React.Dispatch<React.SetStateAction<string>>; 
}