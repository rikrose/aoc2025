import { Effect, Layer } from "effect";
import { AnswerData, RequestData } from "../schema";
import { SolutionProvider } from "../solution";

const day1part1ProviderLayer = Layer.succeed(SolutionProvider, {
  solve: Effect.fn("day1part1")(function* () {
    const input = yield* RequestData;
    const answer = input.body.reduce(
      (accumulator, current) => {
        const { pos, zeros } = accumulator;
        const offset =
          current.charAt(0) === "L"
            ? -Number(current.slice(1))
            : Number(current.slice(1));

        let answer = pos + (offset % 100);
        if (answer < 0) answer += 100;
        if (answer > 99) answer -= 100;

        return { pos: answer, zeros: zeros + (answer === 0 ? 1 : 0) };
      },
      { pos: 50, zeros: 0 },
    ).zeros;

    return new AnswerData({
      answer: answer.toString(),
    });
  }),
});

const day1part2ProviderLayer = Layer.succeed(SolutionProvider, {
  solve: Effect.fn("day1part2")(function* () {
    const input = yield* RequestData;
    const answer = input.body.reduce(
      (accumulator, current) => {
        const { pos, zeros } = accumulator;
        const offset =
          current.charAt(0) === "L"
            ? -Number(current.slice(1))
            : Number(current.slice(1));

        let answer = pos + (offset % 100);
        if (answer < 0) answer += 100;
        if (answer > 99) answer -= 100;

        return { pos: answer, zeros: zeros + (answer === 0 ? 1 : 0) };
      },
      { pos: 50, zeros: 0 },
    ).zeros;

    return new AnswerData({
      answer: answer.toString(),
    });
  }),
});

export const Day1 = [day1part1ProviderLayer, day1part2ProviderLayer];
