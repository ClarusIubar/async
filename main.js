// 파일 연결 테스트
const ajaxTest = (e) => {

    e.preventDefault()
    
    console.log(e)

    // select 요소 가져오기
    const selectElement = document.querySelector("select")
    // select의 값 출력
    console.log(selectElement.value)


    console.log("통신 성공")

}