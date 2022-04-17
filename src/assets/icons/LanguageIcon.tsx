import * as React from 'react';
import { SVGProps } from 'react';

const SvgComponent = (props: SVGProps<any>) => (
	<svg
		width={80}
		height={80}
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		xmlnsXlink='http://www.w3.org/1999/xlink'
		{...props}
	>
		<path opacity={0.1} fill='url(#a)' d='M0 0h80v80H0z' />
		<defs>
			<pattern id='a' patternContentUnits='objectBoundingBox' width={1} height={1}>
				<use xlinkHref='#b' transform='scale(.01042)' />
			</pattern>
			<image
				id='b'
				width={96}
				height={96}
				xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAE5klEQVR4nO2cW2gdVRSGvyQloRFFidKqD1qNIFQRQZSoLy0iYkEE8QIFUUT0rdDqky8qqKBSUIsgpQgigg+C8VKxqQqCFX3yVi0o4gWtFyqlbVKjJ8aHPWJmutaZOTNr9j4nWR8swtkzWWvN/vfM7MvMgOM4juM4juM4juM4juM4juM4y50hoWwxehbdmQV+Ar4G3gSmgZ+Vfc8CbgQ2ARdkv0+KkGMvSHWeY7HP7U/gGWDtkpzXAjuybanzK7Mcg3AGaPwO3A7MAy+RF6SfGVJ/ZAyKAAD/ZH+Hk2bRG8tKgEEkV+eD1HKWJS5AYlyAxLgAiXEBEuMCJMYFSIwLkBgXIDEuQGJcgMSsihTnMPCHUH42MBYpB4Dv+H8CrymrgTONfOVoYw78ViXW8y3F0+yUJhVT4JqaOeSIcQn6G3hb2TYdIX5fE0OA9wiXIIk9wFyEHPqWGAK83mXbHPBOhBza4OS2HFtfd88tiXdXCzHbvgcMAR/UzCFH272gTwg9j268QeiZxDgbP6W3XtA24FWh/BbgSpOMBCxb3IMVY9ZtTW3afuQGOgp808BvjrZb3WsV9+vH3tBWoCOUbwHObzOwVQv6EXnR/zyh7ELDuBa2W6mbCcKAsonvUqwOYofgexWwU4l7wDB2E+sA65UcnzLwX4rVgVwr+J4CfkM+Mx43jG3dcCCcufMG/kuxOIijyHM8D2TbLxa2XWUUu4kdAdYo9fKKUYxSLIK8rPjem23fImwbBg4axa9r9yt5TxG6rwMjwGbB7xhh5LuI3LcG2GUUv459i3zWNhl0JRGgQ+gtFNmwZJ/DwIiwzw2GB9qr3azUx23GcUppGuBdxe/Dhf0uE/ZZDRwzPuAqtg+5Y9B00FUqQBsDMW3wtaHwe6Owz3HCfSImi8B9yK2z9UGXRFOFJwWf45zYhXtLiX+nQQ692ItKHqcBh1qIV0oT558pPq8T9p0lnOJFJgj3kRiVfxw4R8nZYtBVKoD1bKg2938QuEcoHwf+KpQdAj4ErjbMS2M78L1QPgncGyG+SBN1LzfK4b9rcpv2K/r6gNWgK+ol6BfsbuqTDfKoancrsS0HXVEFeK6K8x74skEuZabN9VsPuqIKsKmK8x54rEEuZSZNFIL9oKtUAKuX9GaBMwi9iiKb6f6y9AHgfaF8ijBAsmY3cmMZA74C1rUQcym5OrfqBc0gV/4E8ALd7w0fA1cI5R8R7iuW7/920CfcricstkhP8EkMA5daJFWkzml1h+Lrpgr/2wFOVf5/Z818NNPm+uswXjOHHBa9lgXCNxwkitMPEiPofX7rteJdxv4aYyHAPsJnAySk+R4JTagZwuKOFQuGvkywEECbfFtDWGyvgibAPPEn56LSpgAbqfBploxLgNOVbf34yIoZ/q2I+Pi3IvoJFyAxLkBiXIDEuACJcQES4wIkRhLgWPQsVg5HigWSAD9ESGSlckLdSgLMREhkpbKnyk4XEe+5nJVk4osf0hnwBfYL7A48S3gYoBKjhBeoU7ea5WJ7kZ8C7MooYQnPL0f1rQM8TY3KX8p6wiN8nxNWp1IfVL/b0ayutqO/7DdwPETvFVH1JXGnAiOElbeqlT+Nj/LNGQEeJSysaxW/ADyC/PqTY8Q64EnCs6Nzme0HnqD9p9ocx3Ecx3Ecx3Ecx3Ecpzb/ArKRyFqu4L9VAAAAAElFTkSuQmCC'
			/>
		</defs>
	</svg>
);

export default SvgComponent;
