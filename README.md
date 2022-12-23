# Oddend

## Intro
잡다한 상품들을 판매하는 offline 상점의 웹사이트로 웹사이트에 대한 리뷰를 남겨 의견을 나눌 수 있으며 원하는 상품을 카트에 담을 수 있다.

## 실행 방법
[https://oddend.web.app](https://oddend.web.app)

## :wrench: Skills
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white" /> <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=React Query&logoColor=white" /> <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled components&logoColor=white" /> <img src="https://img.shields.io/badge/Recoil-61DAFB?style=for-the-badge&logo=Recoil&logoColor=white" /> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white" /> <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white" /> <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white" />

<img src="https://img.shields.io/badge/ReactHookForm-EC5990?style=for-the-badge&logo=ReactHookForm&logoColor=white" /> <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=white" /> <img src="https://img.shields.io/badge/Create React App-09D3AC?style=for-the-badge&logo=Create React App&logoColor=white" />

## :computer: Contents
### 구성

- 이 프로젝트는 크게 메인 페이지, 상품 페이지, 검색 결과 페이지, 커뮤니티 페이지, 마이 페이지, 인증 페이지로 구성되어있다.
  - 상품 페이지와 검색 결과 페이지는 각각  fakestoreapi와 카카오의 책 검색 api를 이용하여 구성하였다.
  - 인증 페이지는 Firebase의 Authentication 기능을 사용하여 구현하였다.
  - 커뮤니티 페이지는 Cloud Firestore의 기능을 사용하여 구현하였다.
  - 전체적인 CSS 스타일링은 styled-components를 활용하였다.
- 배포는 Firebase Hosting을 활용하여 배포하였다.
<br />
<br />
<br />
<p align="center"><img src="https://user-images.githubusercontent.com/99642719/209345469-a964db0a-ab05-4638-929d-2b145ca72f92.gif" /></p>
<ul>
<li> 메인 페이지의 carousel은 React Slick 라이브러리를 활용하여 만들었다.</li>
<br />
<li> Intersection Observer API를 활용하여 헤더와 하단 이미지들의 애니메이션 효과를 나타내었다.</li>
</ul>
<br />
<br />
<br />
<p align="center"><img src="https://user-images.githubusercontent.com/99642719/209345467-d0180cdc-fbcf-4787-beaf-f63b987b2605.gif" /></p>
<ul>
<li> 로그인 및 회원가입의 폼의 입력 값 및 유효성 검사는 React Hook Form 라이브러리를 활용하였다.</li>
<br />
<li> 로그인 및 회원가입은 Firebase에서 제공하는 Authentication 기능 중 이메일/비밀번호 기능을 활용하여 구현하였다.</li>
<br />
<li> 로그인 및 회원가입을 통해 얻은 데이터는 Recoil의 atom을 통해 전역적으로 관리하도록 하였다. atom에 저장된 값은 data-flow graph에 따라 변하여야 하는데 이를 어기고 변이되는 것을 방지하기 위해 기본적으로 freeze되어 있다. 따라서 일반적으로는 인증 데이터를 저장할 수 없기에 atom의 옵션인 dangerouslyAllowMutability를 true로 설정해주었다.</li>
<br />
<li> form 제출 시 유효성 검사를 통해 에러가 생긴 input의 아래에 에러 메시지를 나타내었다.</li>
</ul>
<br />
<br />
<br />
<p align="center"><img src="https://user-images.githubusercontent.com/99642719/209345468-d02a27be-2e7f-4428-881b-1a5c10163fb8.gif" /></p>
<ul>
<li> Cloud Firestore의 기능을 이용하여 데이터를 생성하고 읽고 업데이트하거나 삭제하는 기능을 구현하였다.</li>
<br />
<li> 기존 데이터가 존재할 경우 데이터를 업데이트 하게 해주었고 존재하지 않을 경우 새로운 데이터를 생성하도록 구현하였다.</li>
<br />
<li> 카트에서 숫자를 늘리거나 줄이거나를 통해 데이터를 업데이틀 시켜주었으며 휴지통 버튼을 누를 시 데이터를 삭제하도록 하였다.</li>
</ul>
<br />
<br />
<br />
<p align="center"><img src="https://user-images.githubusercontent.com/99642719/209345473-a6f309c2-84af-4834-84dc-645f5d9ca631.gif" /></p>
<ul>
<li> React Hooks를 활용하여 pagination을 구현하였다.</li>
<br />
<li> 끝 페이지에 닿을 경우 버튼을 disabled 시켜주었고 aria-current 속성을 활용하여 현재 페이지의 버튼 색을 바꾸어 주었다.</li>
</ul>
<br />
<br />
<br />
<p align="center"><img src="https://user-images.githubusercontent.com/99642719/209345472-93fcba26-5129-4f4f-a6e3-ddef159ed47e.gif" /></p>
<ul>
<li> select-option 태그와 onChange 이벤트를 활용하여 데이터의 값을 value에 맞게 필터링 시켜주었다.</li>
<
<li> 필터링 된 숫자가 커서 존재하지 않는 페이지가 뜨는 경우를 막기 위해 useEffect 훅으로 최대 페이지가 바뀔 때 마다 첫 페이지로 가도록 설정해주었다.</li>
</ul>
<br />
<br />
<br />
<p align="center"><img src="https://user-images.githubusercontent.com/99642719/209345463-8ddde952-a703-4e91-aad1-91443f0b1e11.gif" /></p>
<ul>
<li> React Hooks를 활용하여 accordion 구현</li>
</ul>
<br />
<br />
<br />
<p align="center">
<img src="https://user-images.githubusercontent.com/99642719/209345483-e132fa93-6713-4208-b3b4-932bb5c2d4aa.gif" /></p>
<ul>
<li> Cloud Firestore을 활용하여 리뷰 작성, 읽기, 수정 및 삭제를 가능하게 하였다.</li>
<br />
<li> 수정 업데이트 시 React Hook Form의 useForm 훅의 setValue 함수를 통해 수정하기 전 데이터를 화면에 띄우도록 구성하였다.</li>
<br />
<li> 등록된 리뷰들 중 자신의 리뷰에는 수정 버튼이 나타나도록 하였고 작성된 리뷰는 마이 페이지에도 나타나도록 하였다.</li>
</ul>
<br />
<br />
<br />
<p align="center"><img src="https://user-images.githubusercontent.com/99642719/209345484-0e83e35f-32e1-41d6-a8dd-3b523fcf9618.gif" /></p>
<ul>
<li> React의 createPortal 함수를 활용하여 모달 창을 외부 DOM에서 렌더링 하도록 하였다.</li>
<br />
<li> 검색 창은 모달 창의 children으로 구성하였고 입력된 값은 검색 페이지의 keyword 파라미터로 들어간다/</li>
<br />
<li> useSearchParams와 useQuery를 활용하여 카카오 책 검색 API를 불러 화면에 렌더링 되도록 하였다.</li>
</ul>
<br />
<br />
<br />
<p align="center"><img src="https://user-images.githubusercontent.com/99642719/209345476-618b7124-32ae-44b1-8c99-c5d457e066d5.gif" /></p>
<ul>
<li> Firebase Storage의 update 및 download 기능을 활용하여 이미지를 Storage에 저장하고 다운받아 화면에 렌더링 되도록 하였다.</li>
<br />
<li> 개인 정보는 atom에 저장된 데이터를 불러왔으며 추가적인 input으로 제출될 값은 Firestore에 저장되도록 설정하였다.</li>
</ul>
<br />
<br />
<br />
<p align="center">
<img src="https://user-images.githubusercontent.com/99642719/209345479-7fa05460-2f76-443e-a59a-5acbcbbcdadb.gif" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://user-images.githubusercontent.com/99642719/209345481-aa511731-1375-468b-9090-b22e46c74bdf.gif" /></p>
<ul>
<li>화면 사이즈에 맞게 변하도록 반응형 웹을 구성하였다.</li>
</ul>
<br />
<br />
<br />

---
## :fire: 부족한 점 / 고쳐야할 점
- 결제 시스템을 구현하지 못한 점
- code splitting에 대한 부족한 지식
- 조악한 디자인 구성
