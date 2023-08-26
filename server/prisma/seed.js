"use strict";
// SEEDS FOR PROJECTS IN DISCUSSION-BOARD
// https://www.prisma.io/docs/guides/migrate/seed-database for how to create more seed data
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield Promise.all([
            createUser(2, 'me2', 'me2@me.com'),
            createUser(3, 'me3', 'me3@me.com')
        ]);
        const projects = yield Promise.all([
            createProject('f5e1fd39-0bef-46a5-bb2a-b38b3d238969', 'striving to create the best todo-list ever', users[0].id, 'i will create so much functionality!'),
            createProject('f3105dbb-5e16-48b4-b3b6-bdaf8435bec6', 'website featuring hacker movies', users[1].id, 'what other movies would there be to watch?')
        ]);
        const comments = yield Promise.all([
            createComment('Great project!', projects[0].id, users[1].id),
            createComment('Awesome idea!', projects[1].id, users[0].id)
        ]);
        console.log({ users, projects, comments });
    });
}
function createUser(id, username, email) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.user.upsert({
            where: { id },
            update: {},
            create: {
                id,
                username,
                auth0Id: `auth0Id-${username}`,
                email,
                firstName: username,
                lastName: 'last' + username,
                gitHub: 'github.com/' + username
            }
        });
    });
}
function createProject(id, title, authorId, description) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.project.upsert({
            where: { id },
            update: {},
            create: {
                id,
                title,
                description,
                stack: ['Express', 'MongoDB', 'React'],
                timeline: '1 month',
                likes: 1,
                authorId
            }
        });
    });
}
function createComment(text, projectId, authorId) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.comment.create({
            data: {
                text,
                projectId,
                authorId
            }
        });
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
