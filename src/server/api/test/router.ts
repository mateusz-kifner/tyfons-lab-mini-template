import { employeeProcedure, createTRPCRouter } from "../trpc";
import { observable } from "@trpc/server/observable";

export const testRouter = createTRPCRouter({
	getRandom: employeeProcedure.query(() => {
		return Math.random();
	}),

	randomNumber: employeeProcedure.subscription(() => {
		return observable<number>((emit) => {
			const int = setInterval(() => {
				emit.next(Math.random());
			}, 500);
			return () => {
				clearInterval(int);
			};
		});
	}),
});
