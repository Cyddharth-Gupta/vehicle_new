"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const Jwt = tslib_1.__importStar(require("jsonwebtoken"));
const aws_sdk_1 = tslib_1.__importDefault(require("aws-sdk"));
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const express = require('express')();
const server = require('http').createServer(express);
const { SerialPort } = require('serialport');
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});
server.listen(3001);
async function emitWeighingData(io, zoneInfo) {
    const serialPort = new SerialPort({
        path: zoneInfo.weighingPort,
        baudRate: zoneInfo.baudRate,
        dataBits: zoneInfo.dataBits,
        stopBits: zoneInfo.stopBits,
        flowControl: zoneInfo.flowControl,
        parity: zoneInfo.parity,
        autoOpen: true
    });
    console.log("SerialPort is open", serialPort.isOpen);
    //console.log("Entered34");
    serialPort.on('open', function () {
        console.log("Open");
        // serialPort.write(0x05); 
    });
    serialPort.on('data', function (data) {
        // const b = Buffer.from(data);
        // let bufferValue = b.toString('utf-8').replace('\x02','').split(' ').join('');
        let bufferValue = '7800';
        if (!isNaN(parseInt(bufferValue))) {
            let reading = parseFloat(bufferValue);
            if (!isNaN(reading)) {
                io.emit('weighing-bridge-data', { data: 7800 });
            }
        }
    });
    serialPort.on('error', function (error) {
        console.log('error', error);
    });
}
;
let UserController = exports.UserController = class UserController {
    constructor(userRepository, userSessionRepository) {
        this.userRepository = userRepository;
        this.userSessionRepository = userSessionRepository;
    }
    async create(user) {
        return this.userRepository.create(user);
    }
    async count(where) {
        return this.userRepository.count(where);
    }
    async find(filter) {
        return this.userRepository.find(filter);
    }
    async updateAll(user, where) {
        return this.userRepository.updateAll(user, where);
    }
    async findById(id, filter) {
        return this.userRepository.findById(id, filter);
    }
    async updateById(id, user) {
        await this.userRepository.updateById(id, user);
    }
    async replaceById(id, user) {
        await this.userRepository.replaceById(id, user);
    }
    async deleteById(id) {
        await this.userRepository.deleteById(id);
    }
    async login(payload) {
        const user = await this.userRepository.findOne({
            where: {
                username: payload.username,
                password: payload.password
            },
            include: [{
                    "relation": "zone",
                    "scope": {
                        "offset": 0,
                        "skip": 0,
                        "order": ["createdAt desc"],
                        "fields": {},
                        "include": []
                    }
                }]
        });
        if (user) {
            const token = Jwt.sign({ username: user.username, employeeId: user.employeeId }, 'WeighingBridgeServer');
            await this.userSessionRepository.create({
                userId: user.userId,
                token: token
            });
            io.on('connection', function (socket) {
                console.log('a user connected');
                socket.on('disconnect', function () {
                    console.log('user disconnected');
                });
                emitWeighingData(io, user.zone);
            });
            return {
                description: 'User is logged in.',
                data: { token: token, userId: user.userId, isUserRegistered: true, userData: user },
            };
        }
        else {
            return {
                description: 'Either Username or password is incorrect.',
                isUserRegistered: false
            };
        }
    }
    //@authenticate("jwt")
    async logout(payload) {
        const userSession = await this.userSessionRepository.findOne({
            where: {
                userId: payload.userId,
            }
        });
        if (userSession) {
            await this.userSessionRepository.updateById(userSession.userSessionId, { isTokenExpired: true });
            return {
                description: 'User is Logged Out',
            };
        }
        else {
            return {
                description: 'User is invalid',
            };
        }
    }
    async upload(payload) {
        const config = {
            accessKeyId: 'AKIA5R6PRO3WQXNRZFZO',
            secretAccessKey: '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',
        };
        const s3 = new aws_sdk_1.default.S3(config);
        let buffer;
        if (payload.fileType === 'csv') {
            buffer = Buffer.from(payload.fileData.replace(/^data:csv\/\w+;base64,/, ""), 'base64');
        }
        else if (payload.fileType === 'image') {
            buffer = Buffer.from(payload.fileData.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        }
        const uploadedImage = await s3.upload({
            Bucket: 'weighing-bridge-resources',
            Key: `${payload.fileName}.${payload.fileExtension}`,
            Body: buffer,
            ContentEncoding: 'base64',
            ContentType: `${payload.fileType}/${payload.fileExtension}`
        }).promise();
        if (uploadedImage.Location) {
            return {
                description: 'File is uploaded.',
                fileUrl: uploadedImage.Location
            };
        }
        else {
            return {
                description: 'There is some error occured.',
                error: uploadedImage
            };
        }
    }
};
tslib_1.__decorate([
    (0, rest_1.post)('/users'),
    (0, rest_1.response)(200, {
        description: 'User model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.User) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.User, {
                    title: 'NewUser',
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.User]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/users/count'),
    (0, rest_1.response)(200, {
        description: 'User model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.User)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/users'),
    (0, rest_1.response)(200, {
        description: 'Array of User model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.User, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.User)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/users'),
    (0, rest_1.response)(200, {
        description: 'User PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.User, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.User)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.User, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/users/{id}'),
    (0, rest_1.response)(200, {
        description: 'User model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.User, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.User, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/users/{id}'),
    (0, rest_1.response)(204, {
        description: 'User PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.User, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.User]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/users/{id}'),
    (0, rest_1.response)(204, {
        description: 'User PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.User]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/users/{id}'),
    (0, rest_1.response)(204, {
        description: 'User DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "deleteById", null);
tslib_1.__decorate([
    (0, rest_1.post)('/users/login'),
    (0, rest_1.response)(200, {
        description: 'Login Otp is sent.',
        content: { 'application/json': { schema: { token: 'string' } } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
tslib_1.__decorate([
    (0, rest_1.post)('/users/logout'),
    (0, rest_1.response)(200, {
        description: 'User is Logged Out'
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "logout", null);
tslib_1.__decorate([
    (0, rest_1.post)('/file/upload'),
    (0, rest_1.response)(200, {
        description: 'File is uploaded'
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "upload", null);
exports.UserController = UserController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.UserRepository)),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_1.UserSessionRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository,
        repositories_1.UserSessionRepository])
], UserController);
//# sourceMappingURL=user.controller.js.map