//doctor list
interface doctorListPayload  {

}
interface doctorListResponse {
    
}

//appoinment
interface doctorAppoinmentPayload{
	doctor?: number | string;
	doctorId?: number | string;
	slot?: string;
	patient?: number | string;
	[key:string]: any;
}
interface doctorAppoinmentResponse{
	status?: boolean;
	message?: string;
	[key:string]: any;
}

interface doctorSlot {
	date?: string;
	time?: string;
	isBooked?: boolean;
	[key:string]: any;
}