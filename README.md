# FunctionToArrow
`FunctionToArrow`는 JavaScript와 TypeScript의 named function을 arrow function으로 바로 변환해주는 VSCode 익스텐션입니다.

## 사용 방법
VSCode 에디터에서 named function을 선택합니다.
Command Palette (Ctrl+Shift+P 또는 Cmd+Shift+P on macOS)를 열고 `FunctionToArrow` 명령을 실행합니다.
선택한 named function이 arrow function으로 변환됩니다.

## 예시
예를 들어, 다음과 같은 named function을 선택한 상태에서 `FunctionToArrow` 명령을 실행하면,

```typescript
function test(arg1, arg2) {
  return arg1 + arg2;
}
```
아래와 같이 arrow function으로 변환됩니다.

```typescript
const test = (arg1, arg2) => {
  return arg1 + arg2;
}
```
## 설치
VSCode Marketplace에서 'FunctionToArrow'을 검색하거나 이 링크를 통해 설치할 수 있습니다.

## 문제점 제보
문제점이나 개선사항이 있으시다면, GitHub 이슈 트래커를 통해 제보해주세요.