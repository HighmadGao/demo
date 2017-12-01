precision mediump float;
uniform vec4 u_Color;
uniform vec3 u_PointLight;
uniform vec3 u_PointLightColor;
uniform vec3 u_DirectionalLight;
uniform vec3 u_DirectionalLightColor;
uniform vec3 u_AmbientLightColor;
varying vec3 v_Position;
varying vec3 v_Normal;
void main(){
	vec3 normal = normalize(v_Normal);
	vec3 p_LightDirection = normalize(u_PointLight-v_Position);
	float p_nDotL = max(0.0,dot(p_LightDirection,normal));
	vec3 p_Diffuse = u_PointLightColor * u_Color.rgb * p_nDotL;
	vec3 d_LightDirection = normalize(u_DirectionalLight);
	float d_nDotL = max(0.0,dot(d_LightDirection,normal));
	vec3 d_Diffuse = u_DirectionalLightColor * u_Color.rgb * d_nDotL;
	vec3 a_Diffuse = u_AmbientLightColor * u_Color.rgb;
	gl_FragColor = vec4(p_Diffuse + d_Diffuse + a_Diffuse,u_Color.a);
	// gl_FragColor = vec4(u_AmbientLightColor,1.0);
}