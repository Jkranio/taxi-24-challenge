"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePassengerDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_passenger_dto_1 = require("./create-passenger.dto");
class UpdatePassengerDto extends (0, mapped_types_1.PartialType)(create_passenger_dto_1.CreatePassengerDto) {
}
exports.UpdatePassengerDto = UpdatePassengerDto;
//# sourceMappingURL=update-passenger.dto.js.map