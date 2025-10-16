import type { Answer, Question } from "@/@types"

// valores:
// questão certa = 1 ponto
// questão errada = 0 pontos

// multiplicadores | aplicado p/ cada questão individual
// fácil = 1x
// médio = 2x
// difícil = 3x

// bônus tempo | aplicado ao final
// > 60s = 1x (sem bônus)
// > 30s = 1.5x (bônus 50%)
// < 30s = 3x (bônus 200%)

export function calcScore(allQuestions: Question[], allAnswers: Answer[], timeSpent: number): number {
    let score = 0;

    allAnswers.forEach((answer) => {
        if (answer.isCorrect) {
            const question = allQuestions.find(q => q.id === answer.id);
            const difficulty = question?.difficulty ?? 0;
            score += 100 * (difficulty + 1);
        }
    });

    const bonus =
        timeSpent < 30 ? 3 :
            timeSpent < 60 ? 1.5 :
                1;

    return score * bonus;
}
