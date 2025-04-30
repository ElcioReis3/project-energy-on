// "use client";

// import { useRef, useState } from "react";
// import Tesseract from "tesseract.js";
// import { Button } from "@/components/ui/button";

// type CameraReaderProps = {
//   onResult: (data: { serial: string }) => void;
// };

// export const CameraReader = ({ onResult }: CameraReaderProps) => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [loading, setLoading] = useState(false);
//   const [cameraActive, setCameraActive] = useState(false);

//   const startCamera = async () => {
//     try {
//       setCameraActive(true);
//       const constraints = {
//         video: { facingMode: { exact: "environment" } },
//       };

//       let stream: MediaStream;

//       try {
//         stream = await navigator.mediaDevices.getUserMedia(constraints);
//       } catch {
//         // fallback para frontal
//         stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       }

//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         videoRef.current.play();
//       }
//     } catch (error) {
//       console.error("Erro ao acessar a câmera:", error);
//       alert("Erro ao acessar a câmera.");
//       setCameraActive(false);
//     }
//   };

//   const stopCamera = () => {
//     const stream = videoRef.current?.srcObject as MediaStream;
//     stream?.getTracks().forEach((track) => track.stop());
//     if (videoRef.current) {
//       videoRef.current.srcObject = null;
//     }
//     setCameraActive(false);
//   };

//   const captureAndRead = async () => {
//     if (!videoRef.current) return;

//     setLoading(true);

//     const canvas = document.createElement("canvas");
//     const context = canvas.getContext("2d");

//     canvas.width = videoRef.current.videoWidth;
//     canvas.height = videoRef.current.videoHeight;

//     context?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
//     if (context) {
//       context.filter = "contrast(150%) brightness(120%)";
//       context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
//     }
//     const dataUrl = canvas.toDataURL("image/png");

//     try {
//       const result = await Tesseract.recognize(dataUrl, "eng", {
//         logger: (m) => console.log(m),
//       });

//       const text = result.data.text;
//       console.log("Texto extraído:", text);

//       const matches = text.match(/\d{5,}/g);
//       const serial = matches
//         ? matches.sort((a, b) => b.length - a.length)[0]
//         : "";

//       console.log("Número de série detectado:", serial);
//       onResult({ serial });
//     } catch (err) {
//       console.error("Erro na leitura OCR:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-4 items-center">
//       {!cameraActive ? (
//         <Button onClick={startCamera}>Abrir câmera</Button>
//       ) : (
//         <>
//           {/* container com altura e posição */}
//           <div className="relative w-72 h-24 max-w-md aspect-video bg-black">
//             {/* vídeo ocupa tudo */}
//             <video
//               ref={videoRef}
//               className="absolute top-0 left-0 w-72 h-24 object-cover rounded"
//             />
//           </div>

//           <div className="flex gap-2">
//             <Button onClick={captureAndRead} disabled={loading}>
//               {loading ? "Lendo..." : "Capturar e Ler"}
//             </Button>
//             <Button onClick={stopCamera} variant="destructive">
//               Fechar câmera
//             </Button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };
