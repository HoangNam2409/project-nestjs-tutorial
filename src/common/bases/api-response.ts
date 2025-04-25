import { ApiResponseKey } from 'src/enums/api-response-key.enum';
import { HttpStatus } from '@nestjs/common';

/*
    1. Thành công:
         - Chỉ có thông báo thành công (Không có data trả về)
         - Thông báo thành công -> có data trả về
    2. Không thành công:
        - Chỉ có thông bóa không có errors trả về
        - Nhưng có errors trả về -> validate dữ liệu 
*/

export class ApiResponse {
    private static getTimestamp(): string {
        return new Date().toISOString();
    }

    static ok<T>(
        data: T,
        message: string,
        httpStatus: HttpStatus = HttpStatus.OK,
    ): Record<string, unknown> {
        return {
            [ApiResponseKey.STATUS]: true,
            [ApiResponseKey.CODE]: httpStatus,
            [ApiResponseKey.MESSAGE]: message,
            [ApiResponseKey.DATA]: data,
            [ApiResponseKey.TIMESTAMP]: this.getTimestamp(),
        };
    }

    static error<T>(
        errors: T,
        message: string,
        httpStatus: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    ): Record<string, unknown> {
        return {
            [ApiResponseKey.STATUS]: false,
            [ApiResponseKey.CODE]: httpStatus,
            [ApiResponseKey.ERRORS]: errors,
            [ApiResponseKey.MESSAGE]: message,
            [ApiResponseKey.TIMESTAMP]: this.getTimestamp(),
        };
    }

    static message(
        message: string,
        httpStatus: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    ): Record<string, unknown> {
        return {
            [ApiResponseKey.STATUS]:
                httpStatus === HttpStatus.OK ||
                httpStatus === HttpStatus.CREATED,
            [ApiResponseKey.MESSAGE]: message,
            [ApiResponseKey.TIMESTAMP]: this.getTimestamp(),
        };
    }
}
