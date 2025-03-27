import { toast } from "react-hot-toast";

export const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string,
    setImageErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>,
    setBackground: React.Dispatch<React.SetStateAction<string | null>>,
    setLogoOrg: React.Dispatch<React.SetStateAction<string | null>>
) => {
    const file = event.target.files?.[0];

    if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
            const img = new Image();
            img.src = reader.result as string;
            img.onload = () => {
                const { width, height } = img;

                // Kiểm tra kích thước ảnh tùy theo loại (logo, background, logoOrg)
                if (
                    (type === 'logo' && (width !== 720 || height !== 958)) ||
                    (type === 'background' && (width !== 1280 || height !== 720)) ||
                    (type === 'logoOrg' && (width !== 275 || height !== 275))
                ) {
                    setImageErrors((prev) => ({ ...prev, [type]: 'Kích thước ảnh không đúng' }));
                    toast.error('Kích thước ảnh không đúng!', { duration: 10000 });
                } else {
                    setImageErrors((prev) => ({ ...prev, [type]: '' }));
                    // Lưu ảnh vào state tương ứng
                    if (type === 'background') {
                        setBackground(reader.result as string);
                    } else if (type === 'logoOrg') {
                        setLogoOrg(reader.result as string);
                    }
                }
            };
        };

        reader.readAsDataURL(file);
    }
};
