import axios, { AxiosResponse } from "axios";
import { BulkCreateFullFlashCard, CheckExistAccount, ConfirmPayload, CreateFTag, CreateFullFlashCard, CreateFullPracticeFromTest, CreateFullQuiz, CreateFullTest, CreateTag, CreateTestFromQuizIds, Device, EmailResetPassword, FetchingType, GetRecord, InitRecord, LangVersion, LoginPayload, PrintJobPayload, RecordFetchingType, RefreshToken, RemarkWriting, ResendOTPPayload, Schedule, SearchPayload, SignUpPayload, Skill, UpdateAccountPayload, UpdateAvatarPayload, UpdateFTag, UpdateFullFlashCard, UpdateFullQuiz, UpdateFullRecord, UpdateFullTest, UpdateQuiz, UpdateRecord, UpdateRecordConfig, UpdateTag, VerifyOtpForResetPasswordPayload, VerifyOtpPayload } from "./interfaces";
import { UUID } from "crypto";

export class ScheduleOperation {
    private baseUrl: string;
    private langQuery: string;

    constructor() {
        this.baseUrl = 'http://localhost:8000/api/v1/schedule';
        this.langQuery = `lang=${LangVersion.vi}`;
    }

    setLanguage(lang: LangVersion) {
        this.langQuery = `lang=${lang}`;
    }

    async create(payload: any, token: string) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}`, payload, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status < 300,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            
            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        } 
        catch (error: any) {
            console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async searchAll(token: string, payload: { 
        id?: string; 
        userId?: string; 
        deviceId?: string; 
        startDate?: string; 
        endDate?: string; 
    }) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}`, {
                params:  payload,
                withCredentials: true,
                validateStatus: status => status >= 200 && status < 300,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };

        } catch (error: any) {
            console.log("Error searching devices: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            throw new Error(error?.response?.data?.message || "An error occurred");
        }
    }

    async delete(id: string, token: string) {
        try {
            const response: AxiosResponse = await axios.delete(`${this.baseUrl}/delete`, {
                params: { id },
                withCredentials: true,
                validateStatus: status => status >= 200 && status < 300,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            
            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        } 
        catch (error: any) {
            console.log("Error updating account: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async updateSchedule(id: string, payload: any, token: string): Promise<string> {
        try {
            const response: AxiosResponse = await axios.put(`${this.baseUrl}`, payload, {
                params: { id },
                withCredentials: true,
                validateStatus: status => status >= 200 && status < 300,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return response.data;
        } catch (error: any) {
            console.log("Error updating schedule: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            throw new Error(error?.response?.data?.message || "An error occurred");
        }
    }

}


export class AuthOperation {
    private baseUrl: string;
    private langQuery: string;

    constructor() {
        this.baseUrl = 'https://co3001-software-engineering-internal-kw83.onrender.com/api/v1/internal/admin';
        this.langQuery = `lang=${LangVersion.vi}`;
    }
    async getAdmin(limit: number, page: number, token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/get`, {
                params: {limit, page},
				withCredentials: true,
                validateStatus: status => status >= 200 && status < 300,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
    public async signup(payload: SignUpPayload) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/signup?${this.langQuery}`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status < 300
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error signing up: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    public async login(payload: LoginPayload) {
       try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/login`,payload,{
				withCredentials: true,
                validateStatus: status => status >= 200 && status < 300,
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
}
export class AccountOperation {
    private baseUrl: string;
    private langQuery: string;

    constructor() {
        this.baseUrl = 'http://localhost:8000/api/v1/user';
        this.langQuery = `lang=${LangVersion.vi}`;
    }

    setLanguage(lang: LangVersion) {
        this.langQuery = `lang=${lang}`;
    }

    async search(payload: SearchPayload, token: string) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/search?${this.langQuery}`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status < 300,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async findOne(id: UUID, token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/search/${id}?${this.langQuery}`, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status < 300,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async update(id: UUID, payload: UpdateAccountPayload, token: string) {
        try {
			const response: AxiosResponse = await axios.put(`${this.baseUrl}/update/${id}?${this.langQuery}`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status < 300,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error updating account: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async updateAvatar(id: UUID, payload: UpdateAvatarPayload, token: string) {
        try {
            const formData = new FormData();
            formData.append('avatar', payload.avatar);

			const response: AxiosResponse = await axios.put(`${this.baseUrl}/avatar/update/${id}?${this.langQuery}`, formData, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status < 300,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error updating avatar: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    // will return image url in data
    async getAvatar(id: UUID, token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/avatar/get/${id}?${this.langQuery}`, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status < 300,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error getting avatar: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    // get total amount number of accounts
    async count(token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/count?${this.langQuery}`, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status < 300,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async getAuthenticatedInfo(token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/info`, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status < 300,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async resetPassword(email: EmailResetPassword) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/password/reset?${this.langQuery}`, email, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status < 300
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async checkExist(email: CheckExistAccount) {
        try {      
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/check?${this.langQuery}`, email, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status < 300
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error.message);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    public async verifyOtpForResetPassword(payload: VerifyOtpForResetPasswordPayload) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/otp/verify?${this.langQuery}`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status < 300
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error verifying otp: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
}

export class DeviceOperation {
    private baseUrl: string;
    private langQuery: string;

    constructor() {
        this.baseUrl = 'http://localhost:8000/api/v1/device';
        this.langQuery = `lang=${LangVersion.vi}`;
    }

    setLanguage(lang: LangVersion) {
        this.langQuery = `lang=${lang}`;
    }

    async create(payload: any, token: string) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/add`, payload, {

				withCredentials: true,
                validateStatus: status => status >= 200 && status < 300,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async searchAll(token: string, payload: { 
        id?: string; 
        action?: string; 
        status?: string; 
        startDate?: string; 
        endDate?: string; 
    }) {
        console.log(payload)
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}`, {
                params:  payload,
				withCredentials: true,
                validateStatus: status => status >= 200 && status < 300,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };

        } catch (error: any) {
            console.log("Error searching devices: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            throw new Error(error?.response?.data?.message || "An error occurred");
        }
    }

    async update(id: UUID, payload: UpdateDevicePayload, token: string) {
        try {
			const response: AxiosResponse = await axios.put(`${this.baseUrl}/${id}`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status < 300,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error updating account: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
    
    async delete(id: string, token: string) {
        try {
			const response: AxiosResponse = await axios.delete(`${this.baseUrl}/delete`, {
                params:{id},
				withCredentials: true,
                validateStatus: status => status >= 200 && status < 300,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error updating account: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async getData(deviceId: string, token: string){
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/getdata`, {
                params: { deviceId },
                withCredentials: true,
                validateStatus: status => status >= 200 && status < 300,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return response.data.data;
        } catch (error: any) {
            console.log("Error fetching device data: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            throw new Error(error?.response?.data?.message || "An error occurred");
        }
    }

    async updateDevice(id: string, payload: Device, token: string): Promise<string> {
        try {
            const response: AxiosResponse = await axios.put(`${this.baseUrl}/update`, payload, {
                params: { id },
                withCredentials: true,
                validateStatus: status => status >= 200 && status < 300,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return response.data;
        } catch (error: any) {
            console.log("Error updating device: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            throw new Error(error?.response?.data?.message || "An error occurred");
        }
    }

    async getFirstDataPointsForUser(userId: string, token: string): Promise<any[]> {
        if (!userId) {
            throw new Error("User ID is required");
        }
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/first-data-points`, {
                params: { userId },
                withCredentials: true,
                validateStatus: status => status >= 200 && status < 300,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return response.data.data;
        } catch (error: any) {
            console.log("Error fetching first data points: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            throw new Error(error?.response?.data?.message || "An error occurred");
        }
    }

    async triggerAction(value: string, qrCode: string, token: string): Promise<string> {
        if (!value) {
            throw new Error("Value is required");
        }
        if (!qrCode) {
            throw new Error("Unknown QR code");
        }

        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/triggeraction`, null, {
                params: { qrCode: qrCode, value: value },
                withCredentials: true,
                validateStatus: status => status >= 200 && status < 300,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return response.data;
        } catch (error: any) {
            console.error("Error triggering action: ", error?.response?.data);
            throw new Error(error?.response?.data?.message || "An error occurred");
        }
    }
}

export class UserOperation {
    private baseUrl: string;
    private langQuery: string;

    constructor() {
        this.baseUrl = 'http://localhost:8000/api/v1/user';
        this.langQuery = `lang=${LangVersion.vi}`;
    }

    setLanguage(lang: LangVersion) {
        this.langQuery = `lang=${lang}`;
    }
    async searchAllUser(limit: number, page: number, token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/get`,{
                params: {limit, page},
				withCredentials: true,
                validateStatus: status => status >= 200 && status < 300,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
    async searchByAuthen(token: string){
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/info`, {
                params:{
                    Authorization: token
                },
                withCredentials: true,
                validateStatus: status => status >= 200 && status < 300,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };

        } catch (error: any) {
            console.error("Request that caused the error: ", error?.request);
            throw new Error(error?.response?.data?.message || "An error occurred");
        }
    }
    async searchFilesById(id: string, token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/${id}`,{
				withCredentials: true,
                validateStatus: status => status >= 200 && status < 300,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
    async delete(id: UUID, token: string) {
        try {
			const response: AxiosResponse = await axios.delete(`${this.baseUrl}/delete/${id}?${this.langQuery}`, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status < 300,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error updating account: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
}
export class NotificationOperation {
    private baseUrl: string;
    private langQuery: string;

    constructor() {
        this.baseUrl = 'http://localhost:8000/api/v1/notifications/config';
        this.langQuery = `lang=${LangVersion.vi}`;
    }

    setLanguage(lang: LangVersion) {
        this.langQuery = `lang=${lang}`;
    }

    async createOrUpdate(payload: any, token: string) {
        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}`, payload, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status < 300,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        } catch (error: any) {
            console.log("Error creating/updating notification config: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async findOne(userId: string, deviceId: string, token: string) {
        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}/${userId}/${deviceId}`, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status < 300,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        } catch (error: any) {
            console.log("Error fetching notification config: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async update(userId: string, deviceId: string, payload: any, token: string) {
        try {
            const response: AxiosResponse = await axios.put(`${this.baseUrl}/${userId}/${deviceId}`, payload, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status < 300,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        } catch (error: any) {
            console.log("Error updating notification config: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }

    async remove(userId: string, deviceId: string, token: string) {
        try {
            const response: AxiosResponse = await axios.delete(`${this.baseUrl}/${userId}/${deviceId}`, {
                withCredentials: true,
                validateStatus: status => status >= 200 && status < 300,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
        } catch (error: any) {
            console.log("Error deleting notification config: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
        }
    }
}
export interface UpdateDevicePayload {
    name?: number;
    brand?: string;
    type?: string;
    lastMaintenanceDate?: number[];
    supportContact?: string;
    description?: string;
    a4RemainingPages?: number;
    a3RemainingPages?: number;
    status?: string;
    location?: {
        id?: number;
    };
    spso?: {
        id?: number;
    };
}
