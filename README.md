# Convert To Arrow
`Convert To Arrow` 는 JavaScript와 TypeScript의 named function을 arrow function으로 바로 변환해주는 VSCode 익스텐션입니다.

## 기능
- 명명된 함수를 화살표 함수로 변환
- 함수 이름 위에서 명령을 실행할 경우 해당 함수 블록을 자동으로 인식
- 함수 이름 위에서 Cmd + Enter 입력시 추천 명령에 나타남

## 사용 방법
Visual Studio Code에서 JavaScript 또는 TypeScript 파일을 열어주세요.
변환하고 싶은 명명된 함수의 이름 부분에 커서를 위치시킵니다.
명령 팔레트(Command Palette)를 열고 (Mac: Cmd+Shift+P, Windows: Ctrl+Shift+P), "Convert to Arrow Function" 명령을 실행합니다.

## 예시
예를 들어, 다음과 같은 named function 함수위에서 `ConvertToArrow` 명령을 실행하면,

```typescript
// Before
function hello(name) {
  console.log(`Hello, ${name}`);
}

// After
const hello = (name) => {
  console.log(`Hello, ${name}`);
}
```

## 설치
VSCode Marketplace에서 'Function To Arrow'을 검색하거나 이 [링크](https://marketplace.visualstudio.com/items?itemName=hismethod.convert-to-arrow)를 통해 설치할 수 있습니다.

## 문제점 제보
문제점이나 개선사항이 있으시다면, GitHub 이슈 트래커를 통해 제보해주세요.