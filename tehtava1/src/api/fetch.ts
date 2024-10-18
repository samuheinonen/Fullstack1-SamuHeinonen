

async function getData(): Promise<void> {
    const url: string = "https://jsonplaceholder.typicode.com/posts";

    try {
        const response: Response = await fetch(url);
        if (!response.ok) {
            throw new Error('Response status: ${response.status}');
        }

        const json: any = await response.json();
        console.log(json);
    }   catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error("An uknown error");
        }
      }
    }


    export function fetchInit(): void {
        const el = document.getElementById("fetch");
        if (el) {
            el.onpointerdown = getData;
        }
    }
    
